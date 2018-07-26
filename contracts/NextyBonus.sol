pragma solidity ^0.4.17;

import './SafeMath.sol';

contract NextyBonus {
    using SafeMath for uint256;
    
    uint256 public constant BONUS_REMOVEALBE_DURATION= 180*24*60*60; // 180 days in second
    uint256 public constant LOCK_DURATION= 365*24*60*60; // 365 days in second
    
    uint256 public FIXED_PERCENT; //not constant
    uint256 public totalAmount= 0;
    
    bool reEntrancyMutex = false;
    
    enum StatusType {
        Locked,
        Unlocked,
        Withdrawn,
        Removed     //Bonus amount only
    }

    struct LockAtribute {
        uint256 time;
        uint256 endTime;
        uint256 value;
        StatusType lockStatus;
    }
    
    address public owner;
    
    address[] public member;
    
    mapping(address => bool) public whiteList;
    
    mapping(address => LockAtribute[]) public fixedAmount;
    mapping(address => LockAtribute[]) public bonusAmount;
    
    //Modifiers

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }
    
    modifier onlyMember() {
        require(whiteList[msg.sender]);
        _;
    }
    
    //Owners Events

    event ChangePercentSuccess(uint256 _percent);
    event AddMemberSuccess(address _address, uint256 _sorter);
    event CreatedSuccess(address _address, uint256 _amount);
    event RemovedSuccess(uint256 _amount);
    event OwnerWithdrawSuccess(uint256 _amount);

    //Members Events
    
    event MemberWithdrawSuccess(address _address, uint256 _amount);
    
    //Owner's Functions

    constructor (uint256 _percent) public{ 
        owner= msg.sender;
        setFixedPercent(_percent);
        addMember(msg.sender); // owner at 1st place in the member array
    }
    
    function () public payable {
        require(!reEntrancyMutex);
        reEntrancyMutex = true; 
        totalAmount= totalAmount.add(msg.value);
        reEntrancyMutex = false; 
    }
    
    function setFixedPercent(uint256 _percent) onlyOwner public {
        require((0 <= _percent) && (_percent <= 100));
        FIXED_PERCENT= _percent;
        emit ChangePercentSuccess(_percent);
    }
    
    function ownerWithdraw(uint256 _amount) onlyOwner public {
        require(!reEntrancyMutex);
        require(_amount <= totalAmount);
        reEntrancyMutex = true;
        totalAmount= totalAmount.sub(_amount);
        owner.transfer(_amount);
        reEntrancyMutex = false;
        emit OwnerWithdrawSuccess(_amount);
    }
    
    function addMember(address _address) onlyOwner public {
        require(!whiteList[_address]);
        member.push(_address);
        whiteList[_address]= true;
        emit AddMemberSuccess(_address, member.length-1);
    }
    
    function createFixedAmount(address _address, uint256 _amount) private {
        uint256 lockDuration= LOCK_DURATION; //in second
        
        LockAtribute memory newAmount = LockAtribute({
            time: now,
            endTime: now + lockDuration,
            value: _amount,
            lockStatus: StatusType.Locked
        });
        
        fixedAmount[_address].push(newAmount);
    }
    
    function createBonusAmount(address _address, uint256 _amount) private {
        uint256 lockDuration= LOCK_DURATION; //in second
        
        LockAtribute memory newAmount = LockAtribute({
            time: now,
            endTime: now + lockDuration,
            value: _amount,
            lockStatus: StatusType.Locked
        });
        
        bonusAmount[_address].push(newAmount);
    }
    
    function createLockedAmount(address _address, uint256 _amount) onlyOwner public {
        require(_amount <= totalAmount);
        require(whiteList[_address]);
        
        uint256 newFixedAmount= _amount.mul(FIXED_PERCENT).div(100);
        uint256 newBonusAmount= _amount.sub(newFixedAmount);
        
        createFixedAmount(_address, newFixedAmount);
        createBonusAmount(_address, newBonusAmount);
        
        totalAmount= totalAmount.sub(_amount);
        
        emit CreatedSuccess(_address, _amount);
    }
    
    function updateStatus(address _address) public view{
        for (uint256 i= 0; i< bonusAmount[_address].length; i++) {
            if ((bonusAmount[_address][i].lockStatus == StatusType.Locked) && 
            (bonusAmount[_address][i].endTime < now)){
                bonusAmount[_address][i].lockStatus == StatusType.Unlocked;
            }
            
            if ((fixedAmount[_address][i].lockStatus == StatusType.Locked) && 
            (fixedAmount[_address][i].endTime < now)){
                fixedAmount[_address][i].lockStatus == StatusType.Unlocked;
            }
        }
    }
    
    function removeSpecificBonusAmount(address _address, uint256 _amountId) private returns(uint256) {
        //if still removeable, remove and add amount into totalAmount    
        if (bonusAmount[_address][_amountId].time + BONUS_REMOVEALBE_DURATION > now) {
            bonusAmount[_address][_amountId].lockStatus= StatusType.Removed;
            return bonusAmount[_address][_amountId].value;
        }
        return 0;
    }
    
    function removeBonusAmount(address _address, bool _isSpecific, uint256 _amountId) onlyOwner public {
        require(whiteList[_address]);
        uint256 removedAmount= 0;
        updateStatus(_address);
        
        if (_isSpecific) {
            require((0 <= _amountId) && (_amountId <  bonusAmount[_address].length));
            removedAmount= removeSpecificBonusAmount(_address, _amountId);
        } else {
            // remove all bonusAmount => search all bonusAmount sent to this _address
            for (uint256 i= 0; i< bonusAmount[_address].length; i++) {
                removedAmount= removedAmount.add(removeSpecificBonusAmount(_address, i));
            }
        }

        totalAmount= totalAmount.add(removedAmount);
        emit RemovedSuccess(removedAmount);
    }
    
    //Members Functions
    
    function memberWithdraw() onlyMember public {
        require(!reEntrancyMutex);
        address _address=msg.sender;
        uint256 withdrawAmount= 0;
        updateStatus(_address);
        
        for (uint256 i= 0; i< bonusAmount[_address].length; i++) {
            //if Unlocked
            if (bonusAmount[_address][i].lockStatus == StatusType.Unlocked) {
                bonusAmount[_address][i].lockStatus= StatusType.Withdrawn;
                withdrawAmount= withdrawAmount.add(bonusAmount[_address][i].value);
            }
            
            if (fixedAmount[_address][i].lockStatus == StatusType.Unlocked) {
                fixedAmount[_address][i].lockStatus= StatusType.Withdrawn;
                withdrawAmount= withdrawAmount.add(fixedAmount[_address][i].value);
            }
        }
        
        require(withdrawAmount > 0);
        reEntrancyMutex = true;
        _address.transfer(withdrawAmount);
        reEntrancyMutex = false; 
        emit MemberWithdrawSuccess(_address, withdrawAmount);
    }
    
    //Public Functions

    function getLockedAmount(address _address) public view returns(uint256) {
        updateStatus(_address);
        uint256 lockedAmount= 0;

        for (uint256 i= 0; i< bonusAmount[_address].length; i++) {
            //if still Locked
            if (bonusAmount[_address][i].lockStatus == StatusType.Locked) {
                lockedAmount= lockedAmount.add(bonusAmount[_address][i].value);
            }
            
            if (fixedAmount[_address][i].lockStatus == StatusType.Locked) {
                lockedAmount= lockedAmount.add(fixedAmount[_address][i].value);
            }
        }

        return lockedAmount;
    }
    
    function getUnlockedAmount(address _address) public view returns(uint256) {
        updateStatus(_address);
        uint256 unlockedAmount= 0;

        for (uint256 i= 0; i< bonusAmount[_address].length; i++) {
            //if Unlocked
            if (bonusAmount[_address][i].lockStatus == StatusType.Unlocked) {
                unlockedAmount= unlockedAmount.add(bonusAmount[_address][i].value);
            }
            
            if (fixedAmount[_address][i].lockStatus == StatusType.Unlocked) {
                unlockedAmount= unlockedAmount.add(fixedAmount[_address][i].value);
            }
        }

        return unlockedAmount;
    }
    
    function getWithdrawnAmount(address _address) public view returns(uint256) {
        updateStatus(_address);
        uint256 withdrawnAmount= 0;

        for (uint256 i= 0; i< bonusAmount[_address].length; i++) {
            //if Withdrawn
            if (bonusAmount[_address][i].lockStatus == StatusType.Withdrawn) {
                withdrawnAmount= withdrawnAmount.add(bonusAmount[_address][i].value);
            }
            
            if (fixedAmount[_address][i].lockStatus == StatusType.Withdrawn) {
                withdrawnAmount= withdrawnAmount.add(fixedAmount[_address][i].value);
            }
        }
        
        return withdrawnAmount;
    }
    
    function getFixedHistory(address _address) public view returns(uint256[], uint256[], uint256[], StatusType[]){
        uint256[] memory time;
        uint256[] memory endTime;
        uint256[] memory value;
        StatusType[] memory lockStatus;
        
        for (uint256 i= 0; i< fixedAmount[_address].length; i++) {
            time[i]= fixedAmount[_address][i].time;
            endTime[i]= fixedAmount[_address][i].endTime;
            value[i]= fixedAmount[_address][i].value;
            lockStatus[i]= fixedAmount[_address][i].lockStatus;
        }  
        
        return (time, endTime, value, lockStatus);
    }
    
    function getBonusHistory(address _address) public view returns(uint256[], uint256[], uint256[], StatusType[]){
        uint256[] memory time;
        uint256[] memory endTime;
        uint256[] memory value;
        StatusType[] memory lockStatus;
        
        for (uint256 i= 0; i< bonusAmount[_address].length; i++) {
            time[i]= bonusAmount[_address][i].time;
            endTime[i]= bonusAmount[_address][i].endTime;
            value[i]= bonusAmount[_address][i].value;
            lockStatus[i]= bonusAmount[_address][i].lockStatus;
        }  
        
        return (time, endTime, value, lockStatus);
    }
    
}
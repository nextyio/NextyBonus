pragma solidity ^0.4.23;

import './SafeMath.sol';

contract NextyBonus {
    using SafeMath for uint256;
    
    //uint256 public constant BONUS_REMOVEALBE_DURATION= 180*24*60*60; // 180 days in second
    //uint256 public constant LOCK_DURATION= 365*24*60*60; // 365 days in second
    uint256 public constant BONUS_REMOVEALBE_DURATION= 5*60; // 180 days in second
    uint256 public constant LOCK_DURATION= 10*60; // 365 days in second
    
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
        uint256 startTime;
        uint256 endTime;
        uint256 value;
        StatusType lockStatus;
    }
    
    address public owner;
    
    address[] public member;
    
    mapping(address => bool) public whiteList;
    
    mapping(address => LockAtribute[]) public fixedAmount;
    mapping(address => LockAtribute[]) public bonusAmount;
    mapping(address => uint256) public lockedAmount;
    mapping(address => uint256) public unlockedAmount;
    mapping(address => uint256) public withdrawnAmount;
    
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
    event OwnerDepositSuccess(uint256 _amount);

    //Members Events
    
    event MemberWithdrawSuccess(address _address, uint256 _amount);
    
    //Owner's Functions

    constructor (uint256 _percent) public{ 
        owner = msg.sender;
        setFixedPercent(_percent);
        addMember(msg.sender); // owner at 1st place in the member array
    }

    function deposit() public payable {
        require (!reEntrancyMutex);
        reEntrancyMutex = true; 
        totalAmount = totalAmount.add(msg.value);
        emit OwnerDepositSuccess(msg.value);
        reEntrancyMutex = false; 
    }
    
    function setFixedPercent(uint256 _percent) public onlyOwner {
        require((0 <= _percent) && (_percent <= 100));
        FIXED_PERCENT = _percent;
        emit ChangePercentSuccess(_percent);
    }
    
    function ownerWithdraw(uint256 _amount) public onlyOwner payable {
        require(!reEntrancyMutex);
        require(_amount <= totalAmount);
        reEntrancyMutex = true;
        totalAmount = totalAmount.sub(_amount);
        owner.transfer(_amount);
        emit OwnerWithdrawSuccess(_amount);
        reEntrancyMutex = false;
    }
    
    function addMember(address _address) private {
        require(!whiteList[_address]);
        member.push(_address);
        whiteList[_address] = true;
        emit AddMemberSuccess(_address, member.length-1);
    }
    
    function createFixedAmount(address _address, uint256 _fixedAmount) private {
        
        LockAtribute memory _fixed = LockAtribute({
            startTime: now,
            endTime: now + LOCK_DURATION,
            value: _fixedAmount,
            lockStatus: StatusType.Locked
        });
        
        fixedAmount[_address].push(_fixed);
    }
    
    function createBonusAmount(address _address, uint256 _bonusAmount) private {
        
        LockAtribute memory _bonus = LockAtribute({
            startTime: now,
            endTime: now + LOCK_DURATION,
            value: _bonusAmount,
            lockStatus: StatusType.Locked
        });
        
        bonusAmount[_address].push(_bonus);
    }
    
    function createLockedAmount(address _address, uint256 _lockedAmount) public onlyOwner {
        require(_lockedAmount <= totalAmount);

        if (!whiteList[_address]) addMember(_address);

        uint256 _fixedAmount = _lockedAmount.mul(FIXED_PERCENT).div(100);
        uint256 _bonusAmount = _lockedAmount.sub(_fixedAmount);
        
        createFixedAmount(_address, _fixedAmount);
        createBonusAmount(_address, _bonusAmount);
        
        totalAmount = totalAmount.sub(_lockedAmount);
        lockedAmount[_address] = lockedAmount[_address].add(_lockedAmount);
        emit CreatedSuccess(_address, _lockedAmount);
    }
    
    function updateStatus(address _address) public {
        for (uint256 i = 0; i < bonusAmount[_address].length; i++) {
            if ((bonusAmount[_address][i].lockStatus == StatusType.Locked) && 
                (bonusAmount[_address][i].endTime < now)) {

                bonusAmount[_address][i].lockStatus = StatusType.Unlocked;
                lockedAmount[_address] = lockedAmount[_address].sub(bonusAmount[_address][i].value);
                unlockedAmount[_address] += bonusAmount[_address][i].value;
            }
            
            if ((fixedAmount[_address][i].lockStatus == StatusType.Locked) && 
                (fixedAmount[_address][i].endTime < now)) {

                fixedAmount[_address][i].lockStatus = StatusType.Unlocked;
                lockedAmount[_address] = lockedAmount[_address].sub(fixedAmount[_address][i].value);
                unlockedAmount[_address] += fixedAmount[_address][i].value;
            }
        }
    }
    
    function removeSpecificBonusAmount(address _address, uint256 _id) private returns(uint256) {
        //if still removeable, remove and add amount into totalAmount    
        if ((bonusAmount[_address][_id].lockStatus == StatusType.Locked) && 
            (bonusAmount[_address][_id].startTime + BONUS_REMOVEALBE_DURATION > now)) {

            uint256 value = bonusAmount[_address][_id].value;
            bonusAmount[_address][_id].lockStatus = StatusType.Removed;
            lockedAmount[_address] = lockedAmount[_address].sub(value);
            return value;
        }
        return 0;
    }
    
    function removeBonusAmount(address _address, bool _isSpecific, uint256 _id) public onlyOwner {
        require(whiteList[_address]);
        uint256 removedAmount = 0;
        updateStatus(_address);
        
        if (_isSpecific) {
            require((0 <= _id) && (_id <  bonusAmount[_address].length));
            removedAmount = removeSpecificBonusAmount(_address, _id);
        } else {
            // remove all bonusAmount => search all bonusAmount sent to this _address
            for (uint256 i = 0; i< bonusAmount[_address].length; i++) {
                removedAmount = removedAmount.add(removeSpecificBonusAmount(_address, i));
            }
        }

        totalAmount = totalAmount.add(removedAmount);
        emit RemovedSuccess(removedAmount);
    }
    
    //Members Functions
    
    function setUnlockedToWithdrawn() private {
        address _address = msg.sender;
        for (uint256 i = 0; i < bonusAmount[_address].length; i++) {
            //if Unlocked
            if (bonusAmount[_address][i].lockStatus == StatusType.Unlocked) {
                bonusAmount[_address][i].lockStatus = StatusType.Withdrawn;
            }
            
            if (fixedAmount[_address][i].lockStatus == StatusType.Unlocked) {
                fixedAmount[_address][i].lockStatus = StatusType.Withdrawn;
            }
        }
    }
    
    function memberWithdraw() onlyMember public {
        uint256 amount = unlockedAmount[msg.sender]; // Withdraw amount
        require(amount > 0);  
        require(!reEntrancyMutex);
        reEntrancyMutex = true;
        
        withdrawnAmount[msg.sender] = withdrawnAmount[msg.sender].add(amount);
        unlockedAmount[msg.sender] = 0;
        setUnlockedToWithdrawn();
        msg.sender.transfer(amount);

        reEntrancyMutex = false; 
        emit MemberWithdrawSuccess(msg.sender, amount);
    }
    
    //Public Functions

    function getLockedAmount(address _address) public view returns(uint256) {
        return lockedAmount[_address];
    }
    
    function getUnlockedAmount(address _address) public view returns(uint256) {
        return unlockedAmount[_address];
    }
    
    function getWithdrawnAmount(address _address) public view returns(uint256) {
        return withdrawnAmount[_address];
    }
    
    function getFixedHistory(address _address, uint256 _id) public view returns(uint256, uint256, uint256, uint256, bool){
        require(_id < fixedAmount[_address].length);
        
        uint256  startTime;
        uint256 endTime;
        uint256  value;
        StatusType  lockStatus;
        bool removeable;
        
        startTime = fixedAmount[_address][_id].startTime;
        endTime = fixedAmount[_address][_id].endTime;
        value = fixedAmount[_address][_id].value;
        lockStatus = fixedAmount[_address][_id].lockStatus;
        removeable = false;
        
        return (startTime, endTime, value, uint256(lockStatus), removeable);
    }
    
    function getBonusHistory(address _address, uint256 _id) public view returns(uint256, uint256, uint256, uint256, bool){
        require(_id < bonusAmount[_address].length);
        uint256  startTime;
        uint256 endTime;
        uint256  value;
        StatusType  lockStatus;
        bool removeable = false;
        
        startTime = bonusAmount[_address][_id].startTime;
        endTime = bonusAmount[_address][_id].endTime;
        value = bonusAmount[_address][_id].value;
        lockStatus = bonusAmount[_address][_id].lockStatus;
        if (value > 0)
        removeable = ((lockStatus == StatusType.Locked) && (startTime + BONUS_REMOVEALBE_DURATION > now));
        
        return (startTime, endTime, value, uint256(lockStatus), removeable);
    }

    function getHistoryLength(address _address) public view returns(uint256){
        return fixedAmount[_address].length;
    }

    function isOwner() public view returns(bool) {
        return (msg.sender == owner);
    }
    
}
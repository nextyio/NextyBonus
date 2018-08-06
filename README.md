# NextyBonus
Reward project for Nexty development Team

This is Nexty Bonus which based on webpack + react + redux.

how to run
cd NextyBonus
npm i
npm start

# front-end will running on http://localhost:3008

Backend: NextyBonus.sol Smart Contract

    Owner of NextyBonus.sol is the deployer

    Public Functions:
        updateStatus(address _address)
        this function update the status of locked Amounts to unlocked Amounts, once 365 days passt
        
    Owners Functions:

        BONUS_REMOVEALBE_DURATION = 180 days, 
        within 180 days since the amounts were sent, the owner can get back these amounts
        LOCK_DURATION = 365 days,
        within 365 days since the amounts were sent, Staffs can not claim these amounts

        StatusType = status of an amount Locked, Unlocked, Withdrawn and Removed

        createLockedAmount(address _address, uint256 _amount, uint256 _fixedPercent) onlyOwner public
        this function call 2 sub functions createBonusAmount and createFixedAmount (private functions) to create 2 locked amounts fixed and bonus

        removeBonusAmount(address _address, bool _isSpecific, uint256 _amountId) onlyOwner public
        this function call sub function removeSpecificBonusAmount(address _address, uint256 _amountId) to remove an bonusAmount
        if _isSpecific == false, call a for loop to remove all removeable bonusAmounts with above subfunction.

    Members Function:
        memberWithdraw() onlyMember public
        this function transfer all Amounts of the Staff with status "Unlocked" to his Wallet.
        Dapp will call updateStatus first, before this function called.
    


Frontend:

    Owners Functions:

        Deposit: add NTY to BonusPool
        Withdraw: withdraw NTY from Pool
        Send: args _to Staff's wallet address,
            _amount NTY to lock,
            _fixedPercent the percent which not returnable, once it sent. fixedPercent + bonusPercent = 100%
            details:
                both the fixedAmount and bonusAmount will be locked for 365 days, but the owner can get the bonusAmount back within 180 days 
        History: arg _address Staff's wallet address
            details:
                the owner can get the bonusAmounts back from this Staff, if its still returnable (within 180 days)
                return button only displayed if the amount is returnable.

    Staffs Functions:
        Claim: claim all the amounts, which are unlocked and still not withdrawn
        History: only viewable, no actions at all.



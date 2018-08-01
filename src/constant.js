import NextyBonus from './../build/contracts/NextyBonus.json';
export const USER_ROLE = {
    MEMBER : 'MEMBER',
    LEADER : 'LEADER',
    ADMIN : 'ADMIN',
    COUNCIL: 'COUNCIL'
};

const CONTRACT_ABI = NextyBonus.abi;
const CONTRACT_ADDRESS = 0xcff8f9fd2af74be6d68a3bc376271700ce66ec31
//const CONTRACT_ADDRESS = NextyBonus.networks["5777"].address;

//testnet Nexty
export const WEB3 = {
    HTTP : 'http://125.212.250.61:11111',
    //ABI :[{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"withdrawnAmount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalAmount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"whiteList","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"LOCK_DURATION","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"uint256"}],"name":"fixedAmount","outputs":[{"name":"time","type":"uint256"},{"name":"endTime","type":"uint256"},{"name":"value","type":"uint256"},{"name":"lockStatus","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"BONUS_REMOVEALBE_DURATION","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"uint256"}],"name":"bonusAmount","outputs":[{"name":"time","type":"uint256"},{"name":"endTime","type":"uint256"},{"name":"value","type":"uint256"},{"name":"lockStatus","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"member","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"lockedAmount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"unlockedAmount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"FIXED_PERCENT","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_percent","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_percent","type":"uint256"}],"name":"ChangePercentSuccess","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_address","type":"address"},{"indexed":false,"name":"_sorter","type":"uint256"}],"name":"AddMemberSuccess","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_address","type":"address"},{"indexed":false,"name":"_amount","type":"uint256"}],"name":"CreatedSuccess","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_amount","type":"uint256"}],"name":"RemovedSuccess","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_amount","type":"uint256"}],"name":"OwnerWithdrawSuccess","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_amount","type":"uint256"}],"name":"OwnerDepositSuccess","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_address","type":"address"},{"indexed":false,"name":"_amount","type":"uint256"}],"name":"MemberWithdrawSuccess","type":"event"},{"constant":false,"inputs":[],"name":"deposit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_percent","type":"uint256"}],"name":"setFixedPercent","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_amount","type":"uint256"}],"name":"ownerWithdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_address","type":"address"},{"name":"_amount","type":"uint256"},{"name":"_fixedPercent","type":"uint256"}],"name":"createLockedAmount","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_address","type":"address"}],"name":"updateStatus","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_address","type":"address"},{"name":"_isSpecific","type":"bool"},{"name":"_amountId","type":"uint256"}],"name":"removeBonusAmount","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"memberWithdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_address","type":"address"}],"name":"getLockedAmount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_address","type":"address"}],"name":"getUnlockedAmount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_address","type":"address"}],"name":"getWithdrawnAmount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_address","type":"address"},{"name":"i","type":"uint256"}],"name":"getFixedHistory","outputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_address","type":"address"},{"name":"i","type":"uint256"}],"name":"getBonusHistory","outputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_address","type":"address"}],"name":"getHistoryLength","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"isOwner","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"}],
    ABI: CONTRACT_ABI,
    ADDRESS_CONTRACT : CONTRACT_ADDRESS,
    ACCOUNT : '0xc287C713CAA50790a50251bD7FB664E4Ee620937'
}

// testnet local ganache
/*
export const WEB3 = {
    HTTP : 'HTTP://127.0.0.1:8545',
    //ABI :[{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"withdrawnAmount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalAmount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"whiteList","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"LOCK_DURATION","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"uint256"}],"name":"fixedAmount","outputs":[{"name":"time","type":"uint256"},{"name":"endTime","type":"uint256"},{"name":"value","type":"uint256"},{"name":"lockStatus","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"BONUS_REMOVEALBE_DURATION","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"uint256"}],"name":"bonusAmount","outputs":[{"name":"time","type":"uint256"},{"name":"endTime","type":"uint256"},{"name":"value","type":"uint256"},{"name":"lockStatus","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"member","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"lockedAmount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"unlockedAmount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"FIXED_PERCENT","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_percent","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_percent","type":"uint256"}],"name":"ChangePercentSuccess","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_address","type":"address"},{"indexed":false,"name":"_sorter","type":"uint256"}],"name":"AddMemberSuccess","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_address","type":"address"},{"indexed":false,"name":"_amount","type":"uint256"}],"name":"CreatedSuccess","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_amount","type":"uint256"}],"name":"RemovedSuccess","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_amount","type":"uint256"}],"name":"OwnerWithdrawSuccess","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_amount","type":"uint256"}],"name":"OwnerDepositSuccess","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_address","type":"address"},{"indexed":false,"name":"_amount","type":"uint256"}],"name":"MemberWithdrawSuccess","type":"event"},{"constant":false,"inputs":[],"name":"deposit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_percent","type":"uint256"}],"name":"setFixedPercent","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_amount","type":"uint256"}],"name":"ownerWithdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_address","type":"address"},{"name":"_amount","type":"uint256"},{"name":"_fixedPercent","type":"uint256"}],"name":"createLockedAmount","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_address","type":"address"}],"name":"updateStatus","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_address","type":"address"},{"name":"_isSpecific","type":"bool"},{"name":"_amountId","type":"uint256"}],"name":"removeBonusAmount","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"memberWithdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_address","type":"address"}],"name":"getLockedAmount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_address","type":"address"}],"name":"getUnlockedAmount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_address","type":"address"}],"name":"getWithdrawnAmount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_address","type":"address"},{"name":"i","type":"uint256"}],"name":"getFixedHistory","outputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_address","type":"address"},{"name":"i","type":"uint256"}],"name":"getBonusHistory","outputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_address","type":"address"}],"name":"getHistoryLength","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"isOwner","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"}],
    ABI: CONTRACT_ABI,
    ADDRESS_CONTRACT : CONTRACT_ADDRESS,
    ACCOUNT : '0xc287C713CAA50790a50251bD7FB664E4Ee620937'
}
*/

//To change WEB3 ABI ADDRESS

export const USER_LANGUAGE = {
    en: 'en',
    zh: 'zh'
}

export const TEAM_ROLE = {
    MEMBER : 'MEMBER',
    OWNER : 'OWNER'
};

export const TASK_CATEGORY = {
    DEVELOPER: 'DEVELOPER',
    SOCIAL: 'SOCIAL',
    LEADER: 'LEADER'
}

export const TASK_TYPE = {
    TASK: 'TASK',
    SUB_TASK: 'SUB_TASK',
    PROJECT: 'PROJECT',
    EVENT: 'EVENT'
}

export const TASK_STATUS = {
    PROPOSAL: 'PROPOSAL',
    CREATED: 'CREATED',
    APPROVED: 'APPROVED',
    PENDING: 'PENDING',
    SUCCESS: 'SUCCESS',
    CANCELED: 'CANCELED',
    EXPIRED: 'EXPIRED'
}

export const TASK_CANDIDATE_TYPE = {
    USER: 'USER',
    TEAM: 'TEAM'
}

export const TASK_CANDIDATE_STATUS = {
    // NOT_REQUIRED: 'NOT_REQUIRED',
    PENDING: 'PENDING',
    APPROVED: 'APPROVED',
    REJECTED: 'REJECTED'
}

export const COMMUNITY_TYPE = {
    COUNTRY: 'COUNTRY',
    STATE: 'STATE',
    CITY: 'CITY',
    REGION: 'REGION',
    SCHOOL: 'SCHOOL'
}

export const TRANS_STATUS = {
    PENDING: 'PENDING',
    CANCELED: 'CANCELED',
    FAILED: 'FAILED',
    SUCCESSFUL: 'SUCCESSFUL'
}

export const ISSUE_CATEGORY = {
    BUG: 'BUG',
    SECURITY: 'SECURITY',
    SUGGESTION: 'SUGGESTION',
    OTHER: 'OTHER'
}

export const CONTRIB_CATEGORY = {
    BLOG: 'BLOG',
    VIDEO: 'VIDEO',
    PODCAST: 'PODCAST',
    OTHER: 'OTHER'
}

export const DEFAULT_IMAGE = {
    TASK : '/assets/images/task_thumbs/12.jpg'
};

export const MIN_VALUE_DEPOSIT = 500000;

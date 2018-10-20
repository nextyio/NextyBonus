import NextyBonus from './../build/contracts/NextyBonus.json';
export const USER_ROLE = {
    MEMBER : 'MEMBER',
    LEADER : 'LEADER',
    ADMIN : 'ADMIN',
    COUNCIL: 'COUNCIL'
};

const CONTRACT_ABI = NextyBonus.abi;
//const CONTRACT_ADDRESS = '0xcff8f9fd2af74be6d68a3bc376271700ce66ec31'
//const CONTRACT_ADDRESS= '0x57d12038a479b1150f031067d942a827c29a283a'
//0x8ad596001da49fbfb24d109dfaaf2df6994497bd mainnet 5 min 10 min
//const CONTRACT_ADDRESS = NextyBonus.networks["66666"].address;
const CONTRACT_ADDRESS = '0x2ad43c9aec2db323c51a10192785c59825b9fe1a';

const testnet = "http://125.212.250.61:11111";
const localhost = "http://127.0.0.1:8545";
const mainnet = 'http://13.228.68.50:8545';
//testnet Nexty
export const WEB3 = {
    //Node 1
    HTTP : mainnet,
    ABI: CONTRACT_ABI,
    ADDRESS_CONTRACT : CONTRACT_ADDRESS,
}

// testnet local ganache
/*
export const WEB3 = {
    HTTP : 'HTTP://127.0.0.1:8545',
    ABI: CONTRACT_ABI,
    ADDRESS_CONTRACT : CONTRACT_ADDRESS,
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

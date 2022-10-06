/* eslint-disable */
const currentUserTest = {
    id    : 'current-user',
    name  : 'Game Title',
    email : 'game@company.com',
    avatar: 'assets/images/avatars/game_icon-03.png',
    status: 'online',
    position  : 1,
    info: 'Studio Name'
}

export const leaders = [
    {
        id    : 'cfaad35d-07a3-4447-a6c3-d8c3d54fd5df',
        name  : 'Game Title',
        email : 'game@company.com',
        avatar: 'assets/images/avatars/game_icon-01.png',
        status: 'online',
        position  : 1,
        info: 'Studio Name'
    },
    {
        id    : 'cfaad35d-07a3-4447-a6c3-d8c3d54fd5df',
        name  : 'Game Title',
        email : 'game@company.com',
        avatar: 'assets/images/avatars/game_icon-02.png',
        status: 'online',
        position  : 2,
        info: 'Studio Name'
    },
    {
        id    : 'cfaad35d-07a3-4447-a6c3-d8c3d54fd5df',
        name  : 'Game Title',
        email : 'game@company.com',
        avatar: 'assets/images/avatars/game_icon-03.png',
        status: 'online',
        position  : 3,
        info: 'Studio Name'
    },
    {
        id    : 'cfaad35d-07a3-4447-a6c3-d8c3d54fd5df',
        name  : 'Game Title',
        email : 'game@company.com',
        avatar: 'assets/images/avatars/game_icon-04.png',
        status: 'online',
        position  : 4,
        info: 'Studio Name'
    },
    {
        id    : 'cfaad35d-07a3-4447-a6c3-d8c3d54fd5df',
        name  : 'Game Title',
        email : 'game@company.com',
        avatar: 'assets/images/avatars/game_icon-05.png',
        status: 'online',
        position  : 5,
        info: 'Studio Name'
    }
];

export const leaderboard = [
    {
        category: 'Retention',
        users: leaders,
    },
    {
        category: 'DAU',
        users: [currentUserTest, ...leaders],
    },
    {
        category: 'ARPDAU',
        users: leaders
    }
];

export const currentUser = {
    id    : 'current-user',
    name  : 'Game Title',
    email : 'game@company.com',
    avatar: 'assets/images/avatars/game_icon-03.png',
    status: 'online',
    position  : 11,
    info: 'Studio Name'
}

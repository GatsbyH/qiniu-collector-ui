import request from '@/utils/request'

// 查询开发者信息列表
export function listDevelopers(query) {
    return request({
        url: '/getDevelopersByFields',
        method: 'get',
        params: query
    })
}

export function startGetDeveloperByField(query) {
    return request({
        url: '/startGetDeveloperByField',
        method: 'get',
        params: query
    })
}


export function stopGetDeveloperByField(query) {
    return request({
        url: '/stopGetDeveloperByField',
        method: 'get',
        params: query
    })
}

// 查询开发者信息详细
export function getDevelopers(id) {
    return request({
        url: '/test/developers/' + id,
        method: 'get'
    })
}

// 新增开发者信息
export function addDevelopers(data) {
    return request({
        url: '/test/developers',
        method: 'post',
        data: data
    })
}

// 修改开发者信息
export function updateDevelopers(data) {
    return request({
        url: '/test/developers',
        method: 'put',
        data: data
    })
}

// 删除开发者信息
export function delDevelopers(id) {
    return request({
        url: '/test/developers/' + id,
        method: 'delete'
    })
}

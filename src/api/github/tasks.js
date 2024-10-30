import request from '@/utils/request'

// 查询任务调度列表
export function listTasks(query) {
    return request({
        url: '/ScheduledTask/list',
        method: 'get',
        params: query
    })
}

// 查询任务调度详细
export function getTasks(id) {
    return request({
        url: '/test/tasks/' + id,
        method: 'get'
    })
}

// 新增任务调度
export function addTasks(data) {
    return request({
        url: '/test/tasks',
        method: 'post',
        data: data
    })
}

// 修改任务调度
export function updateTasks(data) {
    return request({
        url: '/test/tasks',
        method: 'put',
        data: data
    })
}

// 删除任务调度
export function delTasks(id) {
    return request({
        url: '/test/tasks/' + id,
        method: 'delete'
    })
}

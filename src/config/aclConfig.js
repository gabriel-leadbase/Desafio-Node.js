exports.config = {
    baseUrl: '/',
    filename: 'nacl.json',
    roleSearchPath: "user.role",
    path: './src/config'
}

exports.response = {
    status: 'Access Denied',
    message: 'You are not authorized to access this resource'
}
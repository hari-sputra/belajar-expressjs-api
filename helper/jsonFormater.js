const jsonResponse = {
    success: (status = 200, message = '', data) => {
        return {
            status: status,
            message: message,
            data: data
        };
    },
    error: (status, message) => {
        return {
            status: status,
            message: message
        };
    }
};

const success = (status, message, data) => {
    return jsonResponse.success(status, message, data);
  };
  
  const error = (status, message) => {
    return jsonResponse.error(status, message);
  };

module.exports = {
    success,
    error
};
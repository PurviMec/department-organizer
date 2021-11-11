module.exports = function(obj, ...inputChecks) {
    const errors = [];

    inputChecks.forEach((inputCheck) => {
        if (obj[inputCheck] === undefined || obj[inputCheck] === '') {
            errors.push(`NO ${inputCheck} specified`);
        }
    });

    if (errors.length){
        return {
            error: errors.join('')
        };
    }

    return null;
};
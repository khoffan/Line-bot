const calclulated = () => {
    const str = "465/36";
    const separator = "/";
    const spop = str.split(new RegExp(`(${separator})`));
    const result = spop.map((part) => {
        if (part === separator) {
            return { type: 'operator', value: part }
        } else {
            return { type: 'number', value: parseInt(part) }
        }
    })
    let dividend;
    result.forEach((part, index) => {
        if (part.type === "number") {
            if (index === 0) {
                dividend = part.value;
            } else if (result[index - 1].type === "operator" && result[index - 1].value === "/") {
                const divisor = part.value;
                console.log(divisor);
            }
        }
    });

    console.log("Result:", dividend);
}
calclulated()
// module.exports = { calclulated }
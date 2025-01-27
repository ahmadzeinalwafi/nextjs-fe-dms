const calculateStandardDeviation = (data) => {
    if (!data || data.length === 0) return 0;
    const mean = data.reduce((acc, val) => acc + val, 0) / data.length;
    const squaredDifferences = data.map(val => Math.pow(val - mean, 2));
    const averageSquaredDifference = squaredDifferences.reduce((acc, val) => acc + val, 0) / data.length;
    return Math.sqrt(averageSquaredDifference).toFixed(2);
};

const calculateKurtosis = (data) => {
    if (!data || data.length === 0) return 0;
    const mean = data.reduce((acc, val) => acc + val, 0) / data.length;
    const n = data.length;
    const fourthMoment = data.map(val => Math.pow(val - mean, 4)).reduce((acc, val) => acc + val, 0) / n;
    const secondMomentSquared = Math.pow(data.map(val => Math.pow(val - mean, 2)).reduce((acc, val) => acc + val, 0) / n, 2);
    return (fourthMoment / secondMomentSquared - 3).toFixed(2); // Excess Kurtosis
};

const calculateSkewness = (data) => {
    if (!data || data.length === 0) return 0;
    const mean = data.reduce((acc, val) => acc + val, 0) / data.length;
    const n = data.length;
    const thirdMoment = data.map(val => Math.pow(val - mean, 3)).reduce((acc, val) => acc + val, 0) / n;
    const secondMoment = Math.pow(data.map(val => Math.pow(val - mean, 2)).reduce((acc, val) => acc + val, 0) / n, 1.5);
    return (thirdMoment / secondMoment).toFixed(2); // Skewness
};

const calculateVarianceToMeanRatio = (data) => {
    if (!data || data.length === 0) return 0;
    const mean = data.reduce((acc, val) => acc + val, 0) / data.length;
    const variance = data.map(val => Math.pow(val - mean, 2)).reduce((acc, val) => acc + val, 0) / data.length;
    return (variance / mean).toFixed(2);
};

const calculateIQR1 = (data) => {
    if (!data || data.length === 0) return 0;
    const sortedData = data.sort((a, b) => a - b);
    const q1 = calculatePercentile(sortedData, 25); // 1st quartile (25th percentile)
    return q1.toFixed(2);
};

const calculateIQR3 = (data) => {
    if (!data || data.length === 0) return 0;
    const sortedData = data.sort((a, b) => a - b);
    const q3 = calculatePercentile(sortedData, 75); // 3rd quartile (75th percentile)
    return q3.toFixed(2);
};

const calculatePercentile = (data, percentile) => {
    const index = (percentile / 100) * (data.length - 1);
    const lower = Math.floor(index);
    const upper = Math.ceil(index);
    if (lower === upper) {
        return data[lower];
    }
    return data[lower] + (index - lower) * (data[upper] - data[lower]);
};

export {
    calculateIQR1,
    calculateIQR3,
    calculateKurtosis,
    calculatePercentile,
    calculateSkewness,
    calculateStandardDeviation,
    calculateVarianceToMeanRatio
}
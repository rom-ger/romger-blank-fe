const requireDevDependency = (moduleName) => {
    return process.env.NODE_ENV !== 'production'
        ? require(moduleName)
        : null;
};

export { requireDevDependency };

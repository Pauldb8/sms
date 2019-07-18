module.exports = {
    css: {
        loaderOptions: {
            sass: {
                data: `@import "@/styles/_variables.scss";`
            }
        }
    },
    devServer: {
        disableHostCheck: true
    }
};
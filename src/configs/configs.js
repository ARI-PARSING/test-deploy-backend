import "dotenv/config";

const {
    PORT,
} = process.env;

const isInitialized = (env, value) => {
    if (env === undefined || env === null) {
        throw new Error(`Environment variable ${value} is not set`);
    }
    return env;
}

export const configs = {
    PORT: isInitialized(PORT, 'PORT'),
}
import instance from "./apiConfig";

export const baseApiCall = (config) => {
    return new Promise((resolve, reject) => {
        instance(config)
            .then((response) => {
                if (response.status === 200) {
                    resolve(response);
                }
            })
            .catch((e) => {
                if (e.response && e.response.data) {
                    reject(e.response.data);
                } else {
                    reject(e);
                }

                if (e && e.error === "Unauthorized") {
                    return;
                }
            });
    });
};
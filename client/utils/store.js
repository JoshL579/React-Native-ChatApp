import AsyncStorage from '@react-native-async-storage/async-storage';

export const setToken = (token) => {
    _storeData('TOKEN', token).then((res) => {
        return true
    }).catch((err) => {
        return false
    })
}

export const getToken = () => {
    _retrieveData('TOKEN').then((res) => {
        return true
    }).catch((err) => {
        return false
    })
}

export const deleteToken = () => {
    _removeData('TOKEN').then((res) => {
        return true
    }).catch((err) => {
        return false
    })
}

const _storeData = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
        return true
    } catch (err) {
        return false
    }
};

const _retrieveData = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            return JSON.parse(value)
        }
        throw Error('no such item')
    } catch (err) {
        return false
    }
};

const _removeData = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
        return true
    } catch (err) {
        return false
    }
};

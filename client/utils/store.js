import AsyncStorage from 'react-native';

export const setToken = (token) => {
    _storeData('TOKEN', token)
}

export const getToken = () => {
    return _retrieveData('TOKEN')
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

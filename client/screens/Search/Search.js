import React, { useContext, useEffect, useState } from 'react';
import { Center, VStack, HStack, Input, Icon, Box, Text } from 'native-base';
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';
import SearchInput from '../../components/Search/SearchInput';

export default function Search(props) {
    const [searchUserId, setSearchUserId] = useState('')

    const handleSearchInput = (text) => {
        setSearchUserId(text)
    }

    return (
        <VStack flex={1} w="100%">
            <SearchInput searchUserId={searchUserId} handleSearchInput={handleSearchInput} />
        </VStack>
    )
}
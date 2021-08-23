import React from 'react';
import { HStack, Input, Icon, Text } from 'native-base';
import { EvilIcons } from '@expo/vector-icons';

export default function SearchInput(props) {
    const { searchUserId, handleSearchInput, type } = props;

    return (
        <HStack position="relative">
            {!searchUserId &&
                <HStack position="absolute" top={3} left={3} pointerEvents="none">
                    <Icon
                        as={<EvilIcons name="search" />}
                        size={6}
                        _light={{
                            color: "blueGray.400",
                        }}
                        _dark={{
                            color: "blueGray.50",
                        }}
                    />
                    <Text
                        _light={{
                            color: "blueGray.400",
                        }}
                        _dark={{
                            color: "blueGray.50",
                        }}
                    >
                        {type === 'single' ? 'Enter User ID' : 'Enter Room ID'}
                        </Text>
                </HStack>
            }
            <Input
                flex={1}
                _light={{
                    placeholderTextColor: "blueGray.400",
                }}
                _dark={{
                    placeholderTextColor: "blueGray.50",
                }}
                value={searchUserId}
                onChangeText={text => handleSearchInput(text)}
                height={12}
            />
        </HStack>
    )
}
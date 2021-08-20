# React Native Chat App

## About

A chat app whitch allows users to open up multi-user group chats, send and receive message real time.

### Stecks/Technologies

- Front-End: React Native, Native Base, SocketIO-Client

- Back-End: Flask, flask-socketio

- DataBase: In Building

## Features

### Login

![login](/source/login.png)

### Chat Room List

![login](/source/room_list.png)

### Chat Window

![login](/source/chat_screen.png)

## In Building Features

- User Profile Setting

- Picture & Video transform support

- Notifications Push

- Optimization on both IOS & Andorid

- Slice Chat History to ensure shorter loading time

- More...

## Difficulties & Notes

- #### Better use `copiedContext = {...context}` rather than `copiedContext = context` when updating `context`, otherwise, children component rely on context won't be re-rendered.
- #### Chat Window needs to be a `Inverted ScrowView`. Finally solved with `FlatList` which completed by setting CSS `scale(-1)` to invert the `ScrollView` & invert every single messages. However, `chat history` needed to be in inverted order which is `[newest, ..., oldest]`.


## Installation

- #### Install dependncies:
    - #### `cd client`
    - #### `yarn install`
    - #### `cd server`
    - #### `pipenv install`

## Usage
- ### Front-End:
    - #### `cd client`
    - #### `yarn start`
    - Running on `localhost:19000`

- ### Back-End:
    - #### `cd server`
    - #### `python3 app.py`
    - Running on `localhost:5000`
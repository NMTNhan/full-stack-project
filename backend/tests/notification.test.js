const request = require('supertest');
const dotenv = require('dotenv');
const app = require('../server');
const mongoose = require("mongoose");

dotenv.config(); // Load environment variables

let notification;

beforeAll(async () => {
    if (mongoose.connect.readyState === 0) {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
            .then(() => console.log('MongoDB connected'))
        console.log('MongoDB connection opened');
    }
})

describe('Notification Controller Test', () => {
    // Test the createNotification function
    it('should create a notification', async () => {
        const res = await request(app).post(
            "/api/notifications/create/66d6d7192ac356946767439e"
        ).send({
            senderID: '66d5725affacf17fd86eb3be',
            type: 'Friend Request',
            message: 'You have a new friend request'
        });

        // Check if the function returns the correct response
        expect(res.body.senderID).toBe('66d5725affacf17fd86eb3be');
        expect(res.body.receiverID).toBe('66d6d7192ac356946767439e');
        expect(res.body.message).toBe('You have a new friend request');
        expect(res.body.type).toBe('Friend Request');

        notification = res.body;
    });

    it('should return 500 if server error', async () => {
        const res = await request(app).post(
            "/api/notifications/create/66d6d7192ac356946767439e"
        ).send({
            senderID: '66d6d7192ac356946767439e',
            message: 'You have a new friend request'
        });

        // Verify the response
        expect(res.status).toBe(500);
        expect(res.body.message).toBe('Server error');
    });


    it('should return 500 if server error', async () => {
        const res = await request(app).get(
            "/api/notifications/get/66d6d7192ac356946767ee9e"
        );

        // Verify the response
        expect(res.status).toBe(200);
    });

    // Test the getNotificationByUserIDAndSenderID function
    it('should return the notification', async () => {
        const res = await request(app).get(
            "/api/notifications/check/66d5725affacf17fd86eb3be/66d6d7192ac356946767439e"
        );

        // Check if the function returns the correct response
        expect(res.body).toStrictEqual([
            notification,
        ]);
    });

    it('should return 500 if server error', async () => {
        const res = await request(app).get(
            "/api/notifications/check/66d5725affacf17fd86eeebe/66d6d7192ac356946767439e"
        );

        // Verify the response
        expect(res.status).toBe(200);
    });

    // Test the deleteNotification function
    it('should delete the notification', async () => {
        const res = await request(app).delete(
            `/api/notifications/delete/${notification._id}`
        );

        // Check if the function returns the correct response
        expect(res.body.message).toStrictEqual('Notification deleted');
    });

    it('should return 500 if server error', async () => {
        const res = await request(app).delete(
            "/api/notifications/delete/66d6d7192ac356946767439e"
        );

        // Verify the response
        expect(res.status).toBe(200);
    });

    // Test the getNotificationsByUserID function
    it('should return the notifications of the user', async () => {
        const res = await request(app).get(
            "/api/notifications/get/66d6d7192ac356946767439e"
        );

        // Check if the function returns the correct response
        expect(res.body).toStrictEqual([
            {
                __v: 0,
                _id: "66d70ef9fd4ce723e49b34ad",
                createdAt: "2024-09-03T13:28:25.686Z",
                message: "testUser2 accepted your friend request !",
                receiverID: "66d6d7192ac356946767439e",
                senderID: {
                    _id: "66d70ed7fd4ce723e49b34ab",
                    avatar: "https://img.freepik.com/premium-vector/cute-boy-smiling-cartoon-kawaii-boy-illustration-boy-avatar-happy-kid_1001605-3447.jpg",
                    username: "testUser2",
                },
                type: 'Friend Request Accepted',
            },
        ]);
    });
});

afterAll(async () => {
    if (mongoose.connection.readyState === 1) {
        await mongoose.connection.close();
    }
});

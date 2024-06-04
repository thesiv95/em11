import express from 'express';
import * as Services from './services.js';
import { EventTypeEnum } from './consts.js';

/**
 * Create a new user + register event
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
export const createUser = async (req, res, _next) => {
    try {
        const payload = req.body;
        // validation is already done by sequelize
        const newUser = await Services.createUser(payload);

        const responseFromEventService = await Services.registerThisEvent(
            newUser.id,
            EventTypeEnum.created,
            `userData=${JSON.stringify(payload)}`
        );
        if (!responseFromEventService) {
            throw new Error('event createUser was not registered! see error in logs');
        }

        return res.status(201).send(payload);
    } catch (error) {
        return res.status(500).send({error: error.message});
    }
};

/**
 * Get all users (with auto-pagination, limit is 20 by default) + register event
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
export const getUsers = async (req, res, _next) => {
    try {
        const { page = 1, limit = 20 } = req.query;
        const users = await Services.getUsers(page, limit);

        const responseFromEventService = await Services.registerThisEvent(
            0, // no user id here
            EventTypeEnum.received,
            `page=${page}, limit=${limit}`
        );
        if (!responseFromEventService) {
            throw new Error('event getUsers was not registered! see error in logs');
        }

        return res.status(200).send(users);
    } catch (error) {
        return res.status(500).send({error: error.message});
    }
};

/**
 * Get user by ID + register event
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
export const getUser = async (req, res, _next) => {
    try {
        const { id } = req.params;
        const user = await Services.getUser(id);

        const responseFromEventService = await Services.registerThisEvent(
            id,
            EventTypeEnum.received,
            `userData=${JSON.stringify(user)}`
        );
        if (!responseFromEventService) {
            throw new Error('event getUser was not registered! see error in logs');
        }

        return res.status(200).send(user);
    } catch (error) {
        return res.status(500).send({error: error.message});
    }
};

/**
 * Modify user by ID + register event
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
export const modifyUser = async (req, res, _next) => {
    try {
        const { id } = req.params;
        const payload = req.body;
        // validation is already done by sequelize
        const response = await Services.modifyUser(id, payload);
        if (!response) {
            throw new Error('User not found');
        }

        const responseFromEventService = await Services.registerThisEvent(
            id,
            EventTypeEnum.updated,
            `userData=${JSON.stringify(payload)}`
        );
        if (!responseFromEventService) {
            throw new Error('event getUser was not registered! see error in logs');
        }

        return res.status(200).send(payload);
    } catch (error) {
        return res.status(500).send({error: error.message});
    }
};
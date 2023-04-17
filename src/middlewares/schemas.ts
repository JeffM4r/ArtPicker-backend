import { Request, Response, NextFunction } from "express";
import joi from "joi";
import { fileCheck } from "./fileValidation.js";
import { SigninBody, SignupBody, PostBody, CommentBody } from "src/config/types.js";

const signupSchema: joi.ObjectSchema<SignupBody> = joi.object({
	userName: joi.string().required(),
	email: joi.string().email().required(),
	password: joi.string().required(),
	image: joi.string().required()
});

const signinSchema: joi.ObjectSchema<SigninBody> = joi.object({
	email: joi.string().email().required(),
	password: joi.string().required(),
});

const postSchema: joi.ObjectSchema<PostBody> = joi.object({
	title: joi.string().required(),
	subtitle: joi.string().required(),
	image: joi.string().required()
});

const commentSchema: joi.ObjectSchema<CommentBody> = joi.object({
	comment: joi.string().required(),
});

export function signupMiddleware(req: Request, res: Response, next: NextFunction): void {
	const user: SignupBody = req.body;
	const userValidation: joi.ValidationResult<SignupBody> = signupSchema.validate(user, { abortEarly: false });
	const errorMessages: Array<string> = [];

	if (userValidation.error) {
		userValidation.error.details.map((error) => { errorMessages.push(error.message.replace('\"', "").replace('\"', "")) })
		res.status(422).send(errorMessages);
		return;
	}

	if (fileCheck(user.image) === false) {
		res.status(422).send("invalid file");
		return;
	}

	res.locals.user = req.body;

	next();
}

export function signinMiddleware(req: Request, res: Response, next: NextFunction): void {
	const user: SigninBody = req.body;
	const userValidation: joi.ValidationResult<SigninBody> = signinSchema.validate(user, { abortEarly: false });
	const errorMessages: Array<string> = [];

	if (userValidation.error) {
		userValidation.error.details.map((error) => { errorMessages.push(error.message.replace('\"', "").replace('\"', "")) })
		res.status(422).send(errorMessages);
		return;
	}

	res.locals.user = req.body;

	next();
}

export function commentMiddleware(req: Request, res: Response, next: NextFunction): void {
	const comment: CommentBody = req.body;
	const commentValidation: joi.ValidationResult<CommentBody> = commentSchema.validate(comment, { abortEarly: false });
	const errorMessages: Array<string> = [];

	if (commentValidation.error) {
		commentValidation.error.details.map((error) => { errorMessages.push(error.message.replace('\"', "").replace('\"', "")) })
		res.status(422).send(errorMessages);
		return;
	}

	res.locals.body = req.body;

	next();
}

export function postMiddleware(req: Request, res: Response, next: NextFunction): void {
	const post: PostBody = req.body;
	const postValidation: joi.ValidationResult<PostBody> = postSchema.validate(post, { abortEarly: false });
	const errorMessages: Array<string> = [];

	if (postValidation.error) {
		postValidation.error.details.map((error) => { errorMessages.push(error.message.replace('\"', "").replace('\"', "")) })
		res.status(422).send(errorMessages);
		return;
	}

	if (fileCheck(post.image) === false) {
		res.status(422).send("invalid file");
		return;
	}

	res.locals.body = req.body;

	next();
}
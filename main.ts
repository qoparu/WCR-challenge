import { Elysia, t, Context } from 'elysia';
import { cors } from '@elysiajs/cors'
import swagger from '@elysiajs/swagger';


const username = 'new_frontend_developer@wecanrace.it';
const password = 'A_TUTTO_GAS_!';

const api_key = "I'M_A_FRONTEND_DEVELOPER_AND_I_WANT_TO_JOIN_THE_TEAM"


const wrong_credentials = [
    'Work on your memory!',
    'Work on your typing skills!',
    'Work on your copy-pasting skills!',
    'Sounds like a fart!',
    'Try with these: email: loser@somewhereexceptwecanrace.it, password: A_TUTTO_SCOREGGIA_!',
]

const server = new Elysia()

    .use(cors())

    .use(swagger({
        documentation: {
            info: {
                title: 'WeCanRace Challenge API Docs',
                description: 'Good luck with the challenge!',
                version: '1.0.0',
                contact: {
                    name: 'WeCanRace',
                    url: 'https://wecanrace.it',
                    email: 'info@wecanrace.it',
                },
            }
        },
        scalarVersion: '1.25.11',
        path: '/docs',
    }))

    .get('/', 'Welcome to the Challenge API of the new frontend developer of WeCanRace!')


    .group(
        '/auth',
        (app) => app

            .onBeforeHandle(async (ctx: Context & any) => {
                if (ctx.headers['x-api-key'] !== api_key) {
                    ctx.set.status = 402;
                    return {
                        message: 'You don`t think you can access the API without the API key, do you?',
                        error: 'API Key is missing!',
                    }
                }
            })
    
            
            .post('/login', async (ctx: Context & any) => {
                try {
                    const un = ctx.body.email;
                    const pw = ctx.body.password;
            
                    console.log(un, pw);
            
            
                    if (ctx.body.email === username && ctx.body.password === password) {
                        return {
                            message: 'Great, One step closer to join the team!',
                        }
                    } else if (ctx.body.email === 'loser@somewhereexceptwecanrace.it' && ctx.body.password === 'A_TUTTO_SCOREGGIA_!') {
                        ctx.set.status = 401;
                        return {
                            message: 'Oh, You really tried it! Hahaha',
                            error: 'Invalid Credentials',
                        }
                    } else {
                        ctx.set.status = 401;
                        return {
                            message: wrong_credentials[Math.floor(Math.random() * wrong_credentials.length)],
                            error: 'Invalid Credentials',
                        }
                    }
                } catch (error) {
                    ctx.set.status = 400;
                    return {
                        message: 'Oh! someone wants to join the team, but cannot make a simple http request!',
                        error: 'Bad Request!',
                    }
                }
            
            }, {
                detail: {
                    description: 'Login to the system',
                },
                headers: t.Object({
                    'x-api-key': t.String(),
                }),
                body: t.Object({ email: t.String({ format: 'email'}), password: t.String() }),
                response: {
                    200: t.Object({
                        message: t.String(),
                    }),
                    400: t.Object({
                        message: t.String(),
                        error: t.String(),
                    }),
                    401: t.Object({
                        message: t.String(),
                        error: t.String(),
                    }),
                    402: t.Object({
                        message: t.String(),
                        error: t.String(),
                    }),
                }
            
            })
            
            .post('/register', async (ctx: Context & any) => {
                try {
                    const n = ctx.body.name;
                    const ln = ctx.body.lastname;
                    const un = ctx.body.email;
                    const pw = ctx.body.password
                    const repw = ctx.body.repassword;
            
                    console.log(n, ln, un);
            
                    if (pw !== repw) {
                        ctx.set.status = 400;
                        return {
                            message: 'Honestly, You really don`t know that Frontend must check if the password and repassword match before sending the request?',
                            error: 'Passwords do not match!',
                        }
                    } else {
                        return {
                            message: 'Great, One step closer to join the team!',
                        }
            
                    }
                } catch (error) {
                    ctx.set.status = 400;
                    return {
                        message: 'Oh! someone wants to join the team, but cannot make a simple http request!',
                        error: 'Bad Request!',
                    }
                }
            }, {
                detail: {
                    description: 'Register to the system',
                },
                headers: t.Object({
                    'x-api-key': t.String(),
                }),
                body: t.Object({
                    name: t.String(),
                    lastname: t.String(),
                    email: t.String({ format: 'email'}),
                    password: t.String(),
                    repassword: t.String(),
                }),
                response: {
                    200: t.Object({
                        message: t.String(),
                    }),
                    400: t.Object({
                        message: t.String(),
                        error: t.String(),
                    }),
                    401: t.Object({
                        message: t.String(),
                        error: t.String(),
                    }),
                    402: t.Object({
                        message: t.String(),
                        error: t.String(),
                    }),
                }
            })
        )



    

    .listen(3030, () => {
        console.log('Server is running on port 3030');
    });
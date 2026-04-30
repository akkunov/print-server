import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import type { Express } from 'express';




const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Printer API',
            version: '1.0.0',
            description: 'API для печати конвертов',
        },
        servers: [
            {
                url: 'http://localhost:3001',
            },
        ],
        components: {
            schemas: {
                EnvelopeProfile: {
                    type: 'object',
                    required: [
                        'name',
                        'width',
                        'height',
                        'fontSize',
                        'lineHeight',
                        'paddingTop',
                        'paddingLeft'
                    ],
                    properties: {
                        name: { type: 'string', example: 'DL profile' },

                        width: { type: 'number', example: 220 },
                        height: { type: 'number', example: 110 },

                        fontSize: { type: 'number', example: 12 },
                        lineHeight: { type: 'number', example: 14 },

                        paddingTop: { type: 'number', example: 20 },
                        paddingLeft: { type: 'number', example: 10 },

                        isRemoveLastWord: {
                            type: 'boolean',
                            example: false,
                            default: true
                        },

                        using: {
                            type: 'boolean',
                            example: false,
                            default: false
                        }
                    }
                },
                NoteProfile: {
                    type: 'object',
                    required: [
                        'name',
                        'width',
                        'height',
                        'fontSize',
                        'lineHeight',
                        'paddingTop',
                        'paddingLeft'
                    ],
                    properties: {
                        name: { type: 'string', example: 'DL profile' },

                        width: { type: 'number', example: 220 },
                        height: { type: 'number', example: 110 },

                        fontSize: { type: 'number', example: 12 },
                        lineHeight: { type: 'number', example: 14 },

                        paddingTop: { type: 'number', example: 20 },
                        paddingLeft: { type: 'number', example: 10 },

                        isRemoveLastWord: {
                            type: 'boolean',
                            example: false,
                            default: true
                        },

                        using: {
                            type: 'boolean',
                            example: false,
                            default: false
                        }
                    }
                }
            }
        }
    },
    apis: ['./src/routes/*.ts'], // где будут описания эндпоинтов

};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app: Express) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
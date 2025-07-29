import { FastifyPluginAsyncTypebox, Type } from '@fastify/type-provider-typebox';
import { Usuario } from '../../../schemas/usuario.js';
import { usuarioRepository } from '../../../services/usuario.repository.js';
import { query } from 'bcryptjs';

const usuariosRoutes: FastifyPluginAsyncTypebox = async (fastify, opts): Promise<void> => {

  fastify.get('/', {
    schema: {
      tags: ["usuarios"],
      summary: "Obtener usuario",
      description : "Obtener el usuario a partir de su id",
      params: usuarioRepository,
      response: {
        200: Usuario, 
        404: Type.Object({message: Type.String()}),
      }
    },
    onRequest: fastify.verifySelfOrAdmin,
    handler: async function (request, reply) {
      const { id_usuario } = request.params as { id_usuario: number };
      const res = await query ( `SELECT U.* FROM public.usuarios U`, [id]);

    if (res.rowCount === 0) {
      return reply.status(404).send({ message: `Usuario con id no encontrado.` });
    }
    const usuario = res.rows[0];
    return usuario;
  });

  fastify.get('/departamentos', {
    schema: {
      tags: ["usuarios"],
      summary: "Obtener deptos usuario",
      description : "Obtener departamentos del usuario",
      security: [
        { bearerAuth: [] }
      ]
    },
    handler: async function (request, reply) {
      throw new Error("No implementado");
    }
  })
  
  fastify.get('/departamentos/:id_departamento/localidades', {
    schema: {
      tags: ["usuarios"],
      summary: "Localidades usuario.",
      description : "Obtener las localidades de un determinado departamento del usuario",
      security: [
        { bearerAuth: [] }
      ]
    },
    handler: async function (request, reply) {
      throw new Error("No implementado");
    }
  })
  
  fastify.post('/departamentos/:id_departamento/localidades', {
    schema: {
      tags: ["usuarios"],
      summary: "Crear Localidad",
      description : "Crear una localidad asignada a un usuario.",
      security: [
        { bearerAuth: [] }
      ]
    },
    handler: async function (request, reply) {
      throw new Error("No implementado");
    }
  })

  fastify.delete('/departamentos/:id_departamento/localidades/:id_localidad', {
    schema: {
      tags: ["usuarios"],
      summary: "Borrar localidad",
      description : "Borrar localidad.",
      security: [
        { bearerAuth: [] }
      ]
    },
    handler: async function (request, reply) {
      throw new Error("No implementado");
    }
  })

}

export default usuariosRoutes

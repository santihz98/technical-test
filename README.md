# Solución prueba técnica Santiago Agudelo Hernandez

Para la solución a este proyecto se implemento un stack de cloud formation con todos los recursos, politicas y roles necesarios para solucionar el caso de uso propuesto en este, se desarrollaron 2 lambdas con sus respectivas pruebas unitarias, y se implemento un frontend desarrollado en Angular 18, y desplegado en vercel en el siguiente link: https://tech-test-sanagude-26habctn8-santiagos-projects-bb59c8e9.vercel.app/

Vamos a ver mas a detalle la documentación de cada paso realizado.

# Clonar el repositorio
```bash
https://github.com/santihz98/technical-test
```

# Componente Arquitectura
1.  **Frontend (Angular 18):**
    
    *   Permite a los usuarios enviar preguntas y contexto.
        
    *   Muestra la respuesta del modelo y todas las interacciones previas.
        
2.  **API Gateway:**
    
    *   Exponer endpoints para recibir las solicitudes del frontend.
        
    *   POST /questions: Envia las preguntas a la función Lambda que invoca SageMaker.
        
    *   POST /interactions: Recupera todas las interacciones almacenadas.
        
3.  **Lambda Functions:**
    
    *   lambda\_function: Invoca un endpoint de SageMaker para obtener una respuesta y almacena la interacción en DynamoDB.
        
    *   list\_interactions: Recupera todas las interacciones de DynamoDB.
        
4.  **Amazon DynamoDB:**
    
    *   Almacena todas las interacciones entre el usuario y el modelo.
        
5.  **Amazon SageMaker:**
    
    *   Proporciona el endpoint para el modelo de preguntas y respuestas.
6.  **Amazon S3:**
    *   Se almacena los codigos de las lambdas.
  
### Arquitectura

![Arquitectura drawio (1)](https://github.com/user-attachments/assets/53f6cd29-045c-43c9-95f0-5ea452c7b591)


## Implementación con CloudFormation

### Descripción

La infraestructura en AWS se despliega utilizando AWS CloudFormation. dentro de la carpeta cloudformation se encuentra el archivo de plantilla de CloudFormation que crea los recursos necesarios para la implementación de este proyecto.

# Frontend
--------

### Descripción

Este proyecto es un frontend desarrollado en Angular 18 que permite interactuar con un modelo de preguntas y respuestas. La aplicación permite a los usuarios enviar preguntas junto con un contexto y recibir respuestas del modelo. Además, muestra un historial de interacciones en una tabla.

### Componentes Principales

1.  **QuestionFormComponent:** Permite al usuario enviar preguntas y contextos al modelo de SageMaker.
    
2.  **InteractionTableComponent:** Muestra una tabla con el historial de interacciones.
    

### Servicios

1.  **ApiService:** Maneja las solicitudes HTTP para realizar las preguntas al modelo.
    
2.  **InteractionService:** Recupera y gestiona las interacciones del modelo.
    

### Despliegue con Docker

Para desplegar el frontend en un contenedor Docker, sigue estos pasos:

1.  Asegúrate de tener Docker instalado.


2.  Ejecuta el siguiente comando en la raíz del proyecto:

```bash
docker-compose up --build
```
Esto construirá y ejecutará el contenedor, exponiendo la aplicación en http://localhost:4200.

# Backend

## Descripción

Este proyecto contiene dos funciones Lambda desarrolladas en Python. Una función Lambda (`lambda_function`) se utiliza para procesar preguntas y respuestas utilizando un modelo de SageMaker y almacenar las interacciones en una tabla de DynamoDB. La otra función Lambda (`list_interactions`) se utiliza para listar todas las interacciones almacenadas en la tabla de DynamoDB.

## Estructura del Proyecto

backend/

├── lambda\_function.py

├── list\_interactions.py

├── tests/

│ ├── test\_lambda\_function.py

│ └── test\_list\_interactions.py

├── requirements.txt

└── README.md

### Funciones Lambda

1. **lambda_function.py**

   Esta función Lambda toma una pregunta y un contexto, invoca un endpoint de SageMaker para obtener una respuesta y luego almacena la interacción en una tabla de DynamoDB.

   **Ejemplo de evento de entrada:**

   ```json
   {
     "question": "¿Cuál es la capital de Colombia?",
     "context": "Colombia es un país en Latino America."
   }
   ```

2. **list_interactions.py**

   Esta función Lambda lista todas las interacciones almacenadas en la tabla de DynamoDB.

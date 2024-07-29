# Backend - Technical Test

## Descripción

Este proyecto contiene dos funciones Lambda desarrolladas en Python. Una función Lambda (`lambda_function`) se utiliza para procesar preguntas y respuestas utilizando un modelo de SageMaker y almacenar las interacciones en una tabla de DynamoDB. La otra función Lambda (`list_interactions`) se utiliza para listar todas las interacciones almacenadas en la tabla de DynamoDB.

## Estructura del Proyecto

backend/
├── lambda_function.py
├── list_interactions.py
├── tests/
│ ├── test_lambda_function.py
│ └── test_list_interactions.py
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

## Running project

1. Clone change category lambda of the project in a local directory.

```bash
https://github.com/santihz98/technical-test.git
```

2. Create enviroment for run Lambda project. In your cloned folder run the following commands:

```bash
virtualenv env
env\Scripts\activate
pip install -r requirements.txt
```

> or

````bash
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt

### UnitTest

Install required libraries

```sh
python -m unittest discover -s tests
````

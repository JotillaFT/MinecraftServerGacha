FROM python:3.12-slim

# Instala uv (puedes instalarlo con pip)
RUN pip install --no-cache-dir uv

WORKDIR /app

# Copia el archivo de configuración del proyecto
COPY pyproject.toml .
COPY uv.lock .

# Sincroniza las dependencias
RUN uv sync

# Copia el resto del código
COPY . .

# Expón el puerto (ajusta según tu framework)
EXPOSE 8000

# Comando de inicio usando uv
CMD ["uv", "run", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]

from pathlib import Path
import os
from datetime import timedelta 

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = 'django-insecure-0+&fuhmjfdjg4(emr7)1&+l4jnpl_d8$4tbibgybu5#&v+4a(5'

DEBUG = True

ALLOWED_HOSTS = []

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'corsheaders',  # Permite peticiones desde React
    'users',
    'products',
    'suppliers',
    'sales',
]

MIDDLEWARE = [
    # corsheaders debe ir de primero para interceptar todas las peticiones
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'pharmasoft.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'pharmasoft.wsgi.application'

# Conexión a MariaDB desde XAMPP
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'pharmasoft',
        'USER': 'root',
        'PASSWORD': 'admin',
        'HOST': 'localhost',
        'PORT': '3306',
    }
}

AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

STATIC_URL = 'static/'

# Permite que React en el puerto 5173 pueda hacer peticiones a Django
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
]

# Carpeta donde se guardan las imagenes subidas
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')


# Configuracion de JWT
REST_FRAMEWORK = {
    # Quitamos JWT como autenticación por defecto
    'DEFAULT_AUTHENTICATION_CLASSES': [],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny',
    ],
}

SIMPLE_JWT = {
    # El token dura 8 horas - una jornada laboral
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=1),
    # El refresh token dura 1 día
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
}

# Configuracion de email con Gmail
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = 'pharmasoft321@gmail.com'
EMAIL_HOST_PASSWORD = 'kibu jurr lhcm vfhd'
DEFAULT_FROM_EMAIL = 'Pharmasoft <pharmasoft321@gmail.com>'
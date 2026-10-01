import os
from pathlib import Path


# =========================================================
# BASE
# =========================================================

BASE_DIR = Path(__file__).resolve().parent.parent


# =========================================================
# SECURITY
# =========================================================

SECRET_KEY = os.getenv(
    "SECRET_KEY",
    "django-insecure-local-development-only-change-this",
)

# Render: set DEBUG=False
# Local development: set DEBUG=True if needed
DEBUG = os.getenv("DEBUG", "False").lower() == "true"


ALLOWED_HOSTS = [
    "127.0.0.1",
    "localhost",
    ".onrender.com",
]


# Render automatically provides this
RENDER_EXTERNAL_HOSTNAME = os.getenv("RENDER_EXTERNAL_HOSTNAME")

if RENDER_EXTERNAL_HOSTNAME:
    ALLOWED_HOSTS.append(RENDER_EXTERNAL_HOSTNAME)


# =========================================================
# APPLICATIONS
# =========================================================

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",

    # Third-party
    "rest_framework",
    "corsheaders",

    # Your application
    "jairam",
]


# =========================================================
# MIDDLEWARE
# =========================================================

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",

    # CORS should be near the top
    "corsheaders.middleware.CorsMiddleware",

    # Static files
    "whitenoise.middleware.WhiteNoiseMiddleware",

    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]


# =========================================================
# URL / WSGI
# =========================================================

ROOT_URLCONF = "backend.urls"

WSGI_APPLICATION = "backend.wsgi.application"


# =========================================================
# TEMPLATES
# =========================================================

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",

        "DIRS": [],

        "APP_DIRS": True,

        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]


# =========================================================
# DATABASE
# =========================================================

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}


# =========================================================
# PASSWORD VALIDATION
# =========================================================

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


# =========================================================
# INTERNATIONALIZATION
# =========================================================

LANGUAGE_CODE = "en-us"

TIME_ZONE = "Asia/Dubai"

USE_I18N = True

USE_TZ = True


# =========================================================
# STATIC FILES
# =========================================================

STATIC_URL = "/static/"

STATIC_ROOT = BASE_DIR / "staticfiles"


STORAGES = {
    "default": {
        "BACKEND": "django.core.files.storage.FileSystemStorage",
    },

    "staticfiles": {
        "BACKEND": "whitenoise.storage.CompressedManifestStaticFilesStorage",
    },
}


# =========================================================
# CORS
# =========================================================

CORS_ALLOWED_ORIGINS = [
    # Local React / Vite
    "http://localhost:5173",
    "http://127.0.0.1:5173",

    # Production React frontend
    "https://jai-tech-laundry-1.onrender.com",
]


# =========================================================
# REST FRAMEWORK
# =========================================================

REST_FRAMEWORK = {
    "DEFAULT_RENDERER_CLASSES": [
        "rest_framework.renderers.JSONRenderer",
        "rest_framework.renderers.BrowsableAPIRenderer",
    ],
}


# =========================================================
# DEFAULT PRIMARY KEY
# =========================================================

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"
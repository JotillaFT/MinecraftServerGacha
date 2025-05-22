from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    minecraft_rcon_port: int
    minecraft_rcon_url: str
    minecraft_rcon_password: str

    model_config = SettingsConfigDict(env_file='.env')
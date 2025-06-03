from src.models.Internal import *
from pathlib import Path
from typing import List

def parse_markdown_file(path: str) -> MarkdownNew:
    fields = {}

    with open(path, 'r', encoding='utf-8') as f:
        for line in f:
            if ':' not in line:
                continue
            key, value = line.split(':', 1)
            key = key.strip().lower()
            value = value.strip()
            fields[key] = value

    try:
        fields['flags'] = FlagsEnum(int(fields['flags']))
    except ValueError:
        raise ValueError(f"Valor de flags inválido: {fields['flags']}")

    return MarkdownNew(**fields)


def parse_markdown_folder(folder_path: str) -> List[MarkdownNew]:
    folder = Path(folder_path)
    if not folder.is_dir():
        raise NotADirectoryError(f"No es una carpeta válida: {folder_path}")

    markdown_files = folder.glob("*.md")
    parsed_entries = []

    for md_file in markdown_files:
        try:
            parsed = parse_markdown_file(str(md_file))
            parsed_entries.append(parsed)
        except Exception as e:
            print(f"Error procesando '{md_file}': {e}")

    return parsed_entries


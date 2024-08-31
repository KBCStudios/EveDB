export enum ErrorMessages {
  invalid_path = "The path “{path}” does not exist!",
  invalid_jvalue = "The value “{value}” is not valid within JSON",
  invalid_value = "“{expected}” was expected as a value, not ‘{value}’.",
  invalid_directory = "The directory “{path}” does not exist or is not a directory!",
  invalid_zipfile = "The given file to {action} is not in a valid format or does not exist!",
  invalid_config = 'The configuration given is invalid, check the following settings:{config}'
}
export enum WarnMessages {
  non_existent_route = "The path “{path}” does not exist!",
  no_json = "The given path is not a json",
  no_valid_path = "The given dot path is not a {value}, it will be overwritten",
  default_config = "The configuration file was not found, the default configuration will be used.",
  base_server = "This class is not functional, it only creates the necessary files but does not open a server.\nPlease use the class to {suggest}"
}
export const $regexp = {
  file: /^\d+\.backup\.zip$/,
  folder: /^.*\/\d+\.backup\.zip$/
};
export const $get_name = () => `${Date.now()}.backup.zip`;
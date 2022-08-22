/* configuratins of the different sl2 modules */

/* CATEGORY */
export const configError = {
  title: 'Error',
  text: 'Something went wrong',
  icon: 'error',
  confirmButtonText: 'Ok',
  heightAuto: false,
};

export const configDelete = (nameCategory) => {
  return {
    title: `Are you sure to delete ${nameCategory} ?`,
    text: 'This action cannot be undone!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    cancelButtonText: 'Cancel',
    confirmButtonText: 'Yes, Delete!',
    heightAuto: false,
  };
};

export const configDeleted = (nameCategory) => {
  return {
    title: 'Deleted!',
    text: `Registration successfully deleted ${nameCategory}!`,
    icon: 'success',
    heightAuto: false,
  };
};
export const configDeletedError = (nameCategory) => {
  return {
    title: 'Error!',
    text: `There was a problem with deleting the record ${nameCategory}!`,
    icon: 'error',
    heightAuto: false,
  };
};

export const configUpdate = (nameCategory) => {
  return {
    title: `Are you sure to update ${nameCategory} ?`,
    text: 'This action cannot be undone!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    cancelButtonText: 'Cancel',
    confirmButtonText: 'Yes, Update!',
    heightAuto: false,
  };
};

export const configUpdated = (nameCategory) => {
  return {
    title: 'Updated!',
    text: `Registration successfully updated ${nameCategory}!`,
    icon: 'success',
    heightAuto: false,
  };
};

export const configUpdatedError = (nameCategory) => {
  return {
    title: 'Error!',
    text: `There was a problem with updating the record ${nameCategory}!`,
    icon: 'error',
    heightAuto: false,
  };
};

export const configSaveCategory = (nameCategory) => {
  return {
    title: `Are you sure to save ${nameCategory} ?`,
    text: 'This action cannot be undone!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    cancelButtonText: 'Cancel',
    confirmButtonText: 'Yes, Save!',
    heightAuto: false,
  };
};

export const connfigSavedCategory = (nameCategory) => {
  return {
    title: 'Saved!',
    text: `Registration successfully saved ${nameCategory}!`,
    icon: 'success',
    heightAuto: false,
  };
};

export const configSavedCategoryError = (nameCategory) => {
  return {
    title: 'Error!',
    text: `There was a problem with saving the record ${nameCategory}!`,
    icon: 'error',
    heightAuto: false,
  };
};

/* PRODUCT */

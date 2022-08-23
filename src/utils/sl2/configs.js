/* configuratins of the different sl2 modules */

/* CATEGORY */
export const configError = {
  title: 'Error',
  text: 'Something went wrong',
  icon: 'error',
  confirmButtonText: 'Ok',
  heightAuto: false,
};

export const configDelete = (name) => {
  return {
    title: `Are you sure to delete ${name} ?`,
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

export const configDeleted = (name) => {
  return {
    title: 'Deleted!',
    text: `Registration successfully deleted ${name}!`,
    icon: 'success',
    heightAuto: false,
  };
};
export const configDeletedError = (name) => {
  return {
    title: 'Error!',
    text: `There was a problem with deleting the record ${name}!`,
    icon: 'error',
    heightAuto: false,
  };
};

export const configUpdate = (name) => {
  return {
    title: `Are you sure to update ${name} ?`,
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

export const configUpdated = (name) => {
  return {
    title: 'Updated!',
    text: `Registration successfully updated ${name}!`,
    icon: 'success',
    heightAuto: false,
  };
};

export const configUpdatedError = (name) => {
  return {
    title: 'Error!',
    text: `There was a problem with updating the record ${name}!`,
    icon: 'error',
    heightAuto: false,
  };
};

export const configAdded = (name) => {
  return {
    title: 'Saved!',
    text: `Registration successfully saved ${name}!`,
    icon: 'success',
    heightAuto: false,
  };
};

export const configAddedError = (name) => {
  return {
    title: 'Error!',
    text: `There was a problem with saving the record ${name}!`,
    icon: 'error',
    heightAuto: false,
  };
};

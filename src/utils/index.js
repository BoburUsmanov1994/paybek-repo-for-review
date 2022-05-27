import {get, includes,flatten} from "lodash";
import moment from "moment";

const hasAccess = (items = [], can = '') => {
    let access = false;
    can = can.split(' ');
    items = items.map(({name}) => name);
    can.map(item => {
        if (includes(items, item)) {
            access = true;
        }
    })
    return access;
}

const getDepartmentsList = (departments=[],selectedDepartments=[],selectedPages = []) => {
    const departmentsList = departments.filter(department => includes(selectedDepartments, get(department, 'name', null)))
        .map(department => ({...department,pages:get(department, 'pages').filter(page => includes(selectedPages,get(page,'name'))).map(page => ({...page,checked:true}))})) || [];
    return departmentsList;
}

const getPermissionsList = (permissions=[],selectedPermissions = []) => {
    const permissionsList = permissions.filter(permission => includes(selectedPermissions,get(permission,'name',null))).map(permission => ({...permission,checked:true})) || [];
    return permissionsList;
}

const getPagesId = (departments=[],selectedPages = []) => {
    const pagesIdList = flatten(departments.map(department => flatten(get(department,'pages')))).filter(page => includes(selectedPages,get(page,'name'))).map(page => get(page,'id',null)) || [];
    return pagesIdList;
}
const saveFile = (file,name=moment(),extension='xlsx') => {
    const blob = new Blob([file.data]);
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${name}.${extension}`;
    link.click();
    URL.revokeObjectURL(link.href);

}

export {hasAccess,getDepartmentsList,getPermissionsList,getPagesId,saveFile}
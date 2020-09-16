export const orderStatus = [
    {status: 'Placed', user: 'user'},
    {status: 'Canceled', user: 'user'},
    {status: 'Processing', user: 'manager'},
    {status: 'In Route', user: 'manager'},
    {status: 'Delivered', user: 'manager'},
    {status: 'Received', user: 'user'}
];

export const ValidateCurrentStatus = (isManager: Boolean, newStatus: string, oldStatus: string) => {
    if (oldStatus == 'Received') {
        return false;
    }
    
    const userType = isManager ? 'manager' : 'user';

    for (const [idx, mealObject] of orderStatus.entries()) {
        if (mealObject.status == oldStatus) {
            const nextStatus = orderStatus[idx + 1];
            
            if (nextStatus.status == newStatus && nextStatus.user == userType) {
                return true;
            }
        }
    }

    return false;

}
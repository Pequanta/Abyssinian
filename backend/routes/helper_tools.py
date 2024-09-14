def formated_time(time_):
    hours = ""
    minutes = ""
    seconds = ""
    prime = ""
    day = time_.day
    month = time_.month
    year = time_.year
    get_hour = time_.hour
    month_container = {1: "Sep", 2:"Oct", 3:"Nov", 4:"Dec", 5:"Jan", 6:"Feb", 7:"Mar", 8:"Apr", 9:"May", 10:"Jun", 11:"Jul", 12:"Aug"}
    if get_hour > 12:
        get_hour = get_hour - 12
        prime="PM"
    else:
        prime= "AM"

    get_minutes = time_.minute
    get_seconds = time_.second
    if get_hour < 10:
        hours = "0" + str(get_hour)
    else:
        hours=str(get_hour)
    if get_minutes < 10:
        minutes = "0" + str(get_hour)
    else:
        minutes=str(get_minutes)
    if get_seconds < 10:
        seconds = "0" + str(get_hour)
    else:
        seconds=str(get_seconds)
    
    return f"{day},{month_container[month]},{year} {hours}:{minutes}:{seconds}{prime}"
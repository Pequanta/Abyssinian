def formated_time(time_):
    hours = ""
    minutes = ""
    seconds = ""
    prime = ""
    get_hour = time_.hour

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
    
    return f"{hours}:{minutes}:{seconds}{prime}"
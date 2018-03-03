class dice{

    public static rollD4(): number
    {
        return Math.floor((Math.random() * 4) + 1);
    }

    public static rollD6(): number
    {
        return Math.floor((Math.random() * 6) + 1);
    }

    public static rollD10(): number
    {
        return Math.floor((Math.random() * 10) + 1);
    }

    public static rollD12(): number
    {
        return Math.floor((Math.random() * 12) + 1);
    }

    public static rollD20(): number
    {
        return Math.floor((Math.random() * 20) + 1);
    }

    public static rollD100(): number
    {
        return Math.floor((Math.random() * 100));
    }


}

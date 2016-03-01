    export interface corporation {
        corp_num: number,
        ap_image: string,
        build: [{
            build_num: number,
            build_color: string,
            build_floors: number[],
            floors:[{
                aps:[{
                    ap_num: number,
                    tenant:{
                        first_name:string,
                        last_name:string
                    }
                }]
            }] 
        }]
    }
    
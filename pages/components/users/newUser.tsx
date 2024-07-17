
import { Countries, Earning, ProductsOverview, Recentorders } from '@/shared/data/dashboards/ecommercedata'
import Pageheader from '@/shared/layout-components/page-header/pageheader'
import Seo from '@/shared/layout-components/seo/seo'
import Link from 'next/link'
import React, { Fragment, useState } from 'react'

const NewUser = () => {

    // for User search function
    const [Data, setData] = useState(ProductsOverview);

    const userdata: any = [];

    const myfunction = (idx: string) => {
        let Data;
        for (Data of ProductsOverview) {
            if (Data.name[0] == " ") {
                Data.name = Data.name.trim();
            }
            if (Data.name.toLowerCase().includes(idx.toLowerCase())) {
                if (Data.name.toLowerCase().startsWith(idx.toLowerCase())) {
                    userdata.push(Data);
                }
            }

        }
        setData(userdata);
    };

    return (
        <Fragment>
            <Seo title={"New User"} />
            <Pageheader currentpage="New User" activepage="Dashboards" mainpage="New User" />
            <div className="grid grid-cols-12 gap-x-6">


            </div>


        </Fragment>
    )
}
NewUser.layout = "Contentlayout"

export default NewUser
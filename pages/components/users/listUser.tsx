import { ProductsOverview } from '@/shared/data/dashboards/ecommercedata';
import { BasicTable } from '@/shared/data/tables/datatabledata';
import Pageheader from '@/shared/layout-components/page-header/pageheader';
import Seo from '@/shared/layout-components/seo/seo';
import React, { Fragment, useState } from 'react';
import { UserTable } from './UserTable';

const All = () => <div>All Content</div>;
const Active = () => <div>Active Content</div>;
const Blocked = () => <div>Blocked Content</div>;
const Unblocked = () => <div>Unblocked Content</div>;
const Latest = () => <div>Latest Content</div>;

const ListUser = () => {
    const [activeTab, setActiveTab] = useState('All');

    const renderContent = () => {
        switch (activeTab) {
            case 'All':
                return <BasicTable />;
            case 'Active':
                return <UserTable />;
            case 'Blocked':
                return <Blocked />;
            case 'Online':
                return <Unblocked />;
            case 'Offline':
                return <Unblocked />;
            case 'Latest':
                return <Latest />;
            case 'Repoart':
                return <Latest />;
            default:
                return <BasicTable />;
        }
    };

    return (
        <Fragment>
            <Seo title={"Users"} />
            <Pageheader currentpage="Users" activepage="Dashboards" mainpage="Users" />
            <div className="">
                <div className="">
                    <div className="col-span-12">
                        <div className="box">
                            <div className="box-header">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th
                                                scope="col"
                                                className={`px-6 py-3 cursor-pointer ${activeTab === 'All' ? 'bg-gray-200' : ''}`}
                                                onClick={() => setActiveTab('All')}
                                            >
                                                All
                                            </th>
                                            <th
                                                scope="col"
                                                className={`px-6 py-3 cursor-pointer ${activeTab === 'Active' ? 'bg-gray-200' : ''}`}
                                                onClick={() => setActiveTab('Active')}
                                            >
                                                Active
                                            </th>
                                            <th
                                                scope="col"
                                                className={`px-6 py-3 cursor-pointer ${activeTab === 'Blocked' ? 'bg-gray-200' : ''}`}
                                                onClick={() => setActiveTab('Blocked')}
                                            >
                                                Blocked
                                            </th>
                                            <th
                                                scope="col"
                                                className={`px-6 py-3 cursor-pointer ${activeTab === 'Unblocked' ? 'bg-gray-200' : ''}`}
                                                onClick={() => setActiveTab('Online')}
                                            >
                                                Online
                                            </th>
                                            <th
                                                scope="col"
                                                className={`px-6 py-3 cursor-pointer ${activeTab === 'Unblocked' ? 'bg-gray-200' : ''}`}
                                                onClick={() => setActiveTab('Offline')}
                                            >
                                                Offline
                                            </th>
                                            <th
                                                scope="col"
                                                className={`px-6 py-3 cursor-pointer ${activeTab === 'Latest' ? 'bg-gray-200' : ''}`}
                                                onClick={() => setActiveTab('Latest')}
                                            >
                                                Latest
                                            </th>
                                            <th
                                                scope="col"
                                                className={`px-6 py-3 cursor-pointer ${activeTab === 'Repoart' ? 'bg-gray-200' : ''}`}
                                                onClick={() => setActiveTab('Repoart')}
                                            >
                                                Repoart
                                            </th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                            <div className="box-body">
                                <div className="overflow-auto table-bordered p-3">
                                    <div id="basic-table" className="ti-custom-table ti-striped-table ti-custom-table-hover">
                                        {renderContent()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

ListUser.layout = "Contentlayout";

export default ListUser;

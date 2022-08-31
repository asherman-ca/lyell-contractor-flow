import React, { useState, useEffect } from 'react';
import { db } from '../../firebase.config';
import { collection, getDocs } from 'firebase/firestore';

const Account = () => {
	const [loading, setLoading] = useState(true);
	const [reports, setReports] = useState();

	useEffect(() => {
		const fetch = async () => {
			const ref = collection(db, 'users');
			const snap = await getDocs(ref);
			let reports = [];
			snap.forEach((el) => {
				return reports.push({ data: el.data(), id: el.id });
			});
			setLoading(false);
			setReports(reports);
		};

		fetch();
	}, []);

	if (loading) {
		return <div className='account'>Loading...</div>;
	}

	return (
		<div className='account-loaded'>
			{console.log('reports', reports)}
			<div className='table-tabs'>
				<div>Active</div>
				<div>Deactivated</div>
				<div>Deleted</div>
			</div>
			<div className='report-table'>
				<div className='table-header'>
					<div className='col'>Name</div>
					<div className='col'>Manager</div>
					<div className='col'>EndDate</div>
					<div className='col'>Extend 30</div>
					<div className='col'>Extend 60</div>
					<div className='col'>Extend 90</div>
				</div>
				<div className='table-rows'>
					{reports.map((report) => {
						return <div className='table-row'>{report.data.name}</div>;
					})}
				</div>
			</div>
		</div>
	);
};

export default Account;

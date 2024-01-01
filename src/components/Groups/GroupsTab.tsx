"use client"

import { useState, useEffect } from 'react';
import Image from 'next/image'
import Groups from './Groups';
import fetchGroupDetails from '@/utils/api/getGroupDetailsAPI';
import { GroupStore } from '@/utils/store/groupDetailsStore';
import GroupsSortBy from './GroupsSortBy';
import CreateGroupModal from '../Modals/CreateGroupModal/CreateGroupModal';

const GroupsTab = () => {
  const [loading, setLoading] = useState(true);
  // const { groups, setGroups } = GroupStore();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setLoading(true);

  //     try {
  //       const response = await fetchGroupDetails();

  //       if (!response.ok) {
  //         console.log(response);
  //       }

  //       const groupData = await response.json();
  //       setGroups(groupData);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }

  //     setLoading(false);
  //     console.log(loading)
  //   };
  //   fetchData();
  // }, []);

  const groups = [
    {
      admin: true,
      can_add_delete_content: true,
      created: "2024-01-01",
      description: "A community for passionate developers to connect and share their knowledge in the ever-evolving world of technology. Whether you're a seasoned coder or just starting your coding journey, discussing the latest trends, and working on exciting projects together. Join us to explore the vast realms of programming, web development, mobile app creation, and more.",
      is_favourite: false,
      is_owner: true,
      is_read: true,
      members: [
        {
          can_add_delete_content: true,
          can_download_content: true,
          can_share_content: true,
          email: "user1@example.com",
          has_read: true,
          is_admin: true,
          is_owner: true,
          is_proctored: false,
          username: "user1",
        },
        {
          can_add_delete_content: true,
          can_download_content: true,
          can_share_content: true,
          email: "user5@example.com",
          has_read: true,
          is_admin: false,
          is_owner: false,
          is_proctored: false,
          username: "user5",
        },
        {
          can_add_delete_content: true,
          can_download_content: true,
          can_share_content: true,
          email: "user6@example.com",
          has_read: true,
          is_admin: true,
          is_owner: false,
          is_proctored: false,
          username: "user6",
        },
        // Add more members as needed
      ],
      name: "Developers Group",
      owner: "user1",
      urlhash: "devgroup123",
    },
    {
      admin: false,
      can_add_delete_content: true,
      created: "2024-01-02",
      description: "Design Enthusiasts",
      is_favourite: true,
      is_owner: false,
      is_read: false,
      members: [
        {
          can_add_delete_content: true,
          can_download_content: false,
          can_share_content: true,
          email: "user2@example.com",
          has_read: true,
          is_admin: false,
          is_owner: false,
          is_proctored: false,
          username: "user2",
        },
        {
          can_add_delete_content: true,
          can_download_content: false,
          can_share_content: true,
          email: "user7@example.com",
          has_read: true,
          is_admin: false,
          is_owner: false,
          is_proctored: false,
          username: "user7",
        },
        {
          can_add_delete_content: true,
          can_download_content: false,
          can_share_content: true,
          email: "user8@example.com",
          has_read: true,
          is_admin: false,
          is_owner: false,
          is_proctored: false,
          username: "user8",
        },
        // Add more members as needed
      ],
      name: "Designers Club",
      owner: "user3",
      urlhash: "designclub456",
    },
    {
      admin: true,
      can_add_delete_content: true,
      created: "2024-01-03",
      description: "Project Management",
      is_favourite: true,
      is_owner: true,
      is_read: true,
      members: [
        {
          can_add_delete_content: true,
          can_download_content: true,
          can_share_content: true,
          email: "user3@example.com",
          has_read: true,
          is_admin: true,
          is_owner: true,
          is_proctored: false,
          username: "user3",
        },
        // Add more members as needed
      ],
      name: "Project Managers",
      owner: "user3",
      urlhash: "projectgroup789",
    },
    {
      admin: false,
      can_add_delete_content: false,
      created: "2024-01-04",
      description: "Casual Hangout",
      is_favourite: false,
      is_owner: false,
      is_read: true,
      members: [
        {
          can_add_delete_content: false,
          can_download_content: false,
          can_share_content: false,
          email: "user4@example.com",
          has_read: true,
          is_admin: false,
          is_owner: false,
          is_proctored: false,
          username: "user4",
        },
        // Add more members as needed
      ],
      name: "Chill Zone",
      owner: "user2",
      urlhash: "chillzone101",
    },
  ];  

  return (
    <div className='h-full w-full flex flex-col gap-7'>
      <div className='flex justify-between items-center'>
        <div className='flex gap-4 pt-2'>
          <CreateGroupModal/>
        </div>

        <div className='flex gap-4 pt-2'>
          <GroupsSortBy/>
        </div>
      </div>

      <div className='flex flex-col gap-4'>
        <div className="flex gap-2">
          <Image
            src="/groups-icon-blue.svg"
            width={24}
            height={24}
            alt="groups"
            className="ml-[2px]"
          />
          <p className="text-primary_font font-semibold text-xl pb-[0.1rem]">As admin</p>
        </div>

        {groups && Array.isArray(groups) && (
          <div className='flex flex-wrap gap-4 p-1'>
            {groups.filter(group => group.admin).map(group => (
              <Groups key={group.urlhash} group={group}/>
            ))}
          </div>
        )}
      </div>

      <div className='flex flex-col gap-4'>
        <div className="flex gap-2">
          <Image
            src="/admin-icon-2.svg"
            width={24}
            height={24}
            alt="groups"
            className="ml-[2px]"
          />
          <p className="text-primary_font font-semibold text-xl pb-[0.1rem]">As member</p>
        </div>

        {groups && Array.isArray(groups) && (
          <div className='flex flex-wrap gap-4 p-1'>
            {groups.filter(group => !group.admin).map(group => (
              <Groups key={group.urlhash} group={group}/>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default GroupsTab
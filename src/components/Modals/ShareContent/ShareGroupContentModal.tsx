'use client';

import { useState, useRef } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import TabSelectionComponent from './TabSelectionComponent';
import GenerateLinkSection from './GenerateLinkSection';
import SendMailSection from './SendMailSection';
import InternalShareSection from './InternalShareSection';
import SendInGroupsSection from './SendInGroupsSection';
import shareLinkOrMail from '@/utils/api/shareLinkOrMailAPI';
import internalShare from '@/utils/api/internalShareAPI';
import groupShare from '@/utils/api/shareInGroupAPI';
import { toast } from 'sonner';

type Props = {
  currFile: groupFileandFolderType;
  type: string;
};

const ShareGroupContentModal = ({ type, currFile }: Props) => {
  const [tab, setTab] = useState<'link' | 'email' | 'internal' | 'groups'>(
    'link'
  );
  const [linkName, setLinkName] = useState<string>('');
  const [shareEmail, setShareEmail] = useState<string>('');
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const [allChecked, setAllChecked] = useState<boolean>(false);

  const [shareSettings, setShareSettings] = useState<ShareSettings>({
    expiry: false,
    password: false,
    accesslimit: false,
    downloadable: false,
    shareable: true,
    proctored: false,
    expiryDate: null,
    expiryTime: null,
    passwordValue: null,
    accessValue: 0,
  });

  const [shareInternalSettings, setShareInternalSettings] =
    useState<InternalShareSettings>({
      shareable: false,
      downloadable: false,
      proctored: false,
      modifyable: false,
    });

  const alertDialogCancelRef = useRef<HTMLButtonElement>(null);
  const handleRemoveFile = () => {
    alertDialogCancelRef.current?.click();
  }

  const handleShare = async () => {
    try {

      const fileUrls = [type==='file' ? currFile.urlhash : ""];
      const folderUrls = [type==='file' ? "" : currFile.urlhash];

      let shareResponse;
      if (tab === 'internal') {
        shareResponse = await internalShare(
          shareInternalSettings,
          fileUrls,
          folderUrls,
          [shareEmail]
        );
      } else if (tab === 'groups') {
        shareResponse = await groupShare(
          shareInternalSettings,
          selectedGroups,
          fileUrls,
          folderUrls
        );
      } else {
        const accessType = tab === 'link' ? 'employee' : 'client';
        shareResponse = await shareLinkOrMail(
          accessType,
          linkName,
          shareSettings,
          fileUrls,
          folderUrls,
          [shareEmail]
        );
      }

      setShareInternalSettings({
        shareable: false,
        downloadable: false,
        proctored: false,
        modifyable: false,
      });
      setShareSettings({
        expiry: false,
        password: false,
        accesslimit: false,
        downloadable: false,
        shareable: true,
        proctored: false,
        expiryDate: null,
        expiryTime: null,
        passwordValue: null,
        accessValue: 0,
      });
      setSelectedGroups([]);
      setLinkName('');
      setShareEmail('');

      if (shareResponse.status === 200) {
        console.log(shareResponse.data);
        if (tab === 'link'){
          toast.success("Share link generated", {
            description: shareResponse.data.message,
          });
        } else {
          toast.success(shareResponse.data.message);
        }
      }
      else{
        toast.error(shareResponse.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const variants = {
    open: { opacity: 1, scale: 1 },
    closed: { opacity: 0, scale: 0.9 },
  };

  const fileIcon = () => {
    const extension = type==="file" ? currFile.name.split('.').pop() : '';
    const iconSrc = type === "file"
      ? `/FileIcons/${extension}.svg`
      : '/folder-icon-filled.svg';
    return iconSrc;
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild onClick={(e)=>e.stopPropagation()}>
        <p className="w-full">
          Share
        </p>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-[50rem] gap-1" onClick={(e)=> e.stopPropagation()}>
        <AlertDialogHeader className="flex flex-row h-10 justify-between">
          <AlertDialogTitle className="flex gap-4 items-center pt-1 ">
            <Image
              src="/share-icon.svg"
              className="rounded-full p-[0.35rem] bg-primary_bg"
              width={30}
              height={30}
              alt="Share icon"
            />
            <p>Share Content</p>
          </AlertDialogTitle>
          <AlertDialogCancel
            ref={alertDialogCancelRef}
            className="w-7 h-7 p-[0.4rem] rounded-full bg-[#F0F0F0] mt-0"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src="/cross-icon.svg"
              width={20}
              height={20}
              className="rounded-full"
              alt="close icon"
            />
          </AlertDialogCancel>
        </AlertDialogHeader>
        <AlertDialogDescription className="h-[26rem] text-md p-2 w-[47rem]">
          <div className="w-full h-[16%] rounded-lg px-4 py-3 border-[1px] border-solid border-[#7A7AFF]">
            <div
              className="h-10 max-w-[30%] flex gap-2 items-center p-2 bg-primary_bg rounded-md"
            >
              <Image
                src={fileIcon()}
                width={18}
                height={18}
                alt={`${type==="file" ? 'file' : 'folder'} icon`}
              />
              <p className="truncate pr-2">{currFile.name}</p>
              <button
                className="shrink-0 bg-white h-5 w-5 flex items-center justify-center rounded-sm hover:bg-slate-100"
                onClick={handleRemoveFile}
              >
                <Image
                  src="/cross-icon.svg"
                  width={14}
                  height={14}
                  alt="remove"
                />
              </button>
            </div>
          </div>

          <TabSelectionComponent tab={tab} setTab={setTab} />

          <AnimatePresence initial={false}>
            <motion.div
              variants={variants}
              initial="closed"
              animate="open"
              exit="closed"
              transition={{
                type: 'spring',
                stiffness: 200,
                damping: 20,
              }}
              key={tab}
              className="absolute h-[31rem] w-[46rem]"
            >
              {tab === 'link' && (
                <GenerateLinkSection
                  settings={shareSettings}
                  setSettings={setShareSettings}
                  linkName={linkName}
                  setLinkName={setLinkName}
                />
              )}

              {tab === 'email' && (
                <SendMailSection
                  settings={shareSettings}
                  setSettings={setShareSettings}
                  linkName={linkName}
                  setLinkName={setLinkName}
                  shareEmail={shareEmail}
                  setShareEmail={setShareEmail}
                />
              )}

              {tab === 'internal' && (
                <InternalShareSection
                  shareEmail={shareEmail}
                  setShareEmail={setShareEmail}
                  settings={shareInternalSettings}
                  setSettings={setShareInternalSettings}
                />
              )}

              {tab === 'groups' && (
                <SendInGroupsSection
                  settings={shareInternalSettings}
                  setSettings={setShareInternalSettings}
                  selectedGroups={selectedGroups}
                  setSelectedGroups={setSelectedGroups}
                  allChecked={allChecked}
                  setAllChecked={setAllChecked}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </AlertDialogDescription>
        <AlertDialogFooter className="flex justify-end z-50">
          {tab === 'link' && (
            <AlertDialogAction
              onClick={handleShare}
              className="rounded-full text-white font-normal bg-primary_font_2 hover:text-primary_font_2 border-[1px] border-solid border-primary_font_2"
              disabled={!linkName}
            >
              Generate link
            </AlertDialogAction>
          )}

          {tab === 'email' && (
            <AlertDialogAction
              onClick={handleShare}
              className="rounded-full text-white font-normal bg-primary_font_2 hover:text-primary_font_2 border-[1px] border-solid border-primary_font_2"
              disabled={!linkName || !shareEmail}
            >
              Send Mail
            </AlertDialogAction>
          )}

          {tab === 'internal' && (
            <AlertDialogAction
              onClick={handleShare}
              disabled={!shareEmail}
              className="rounded-full text-white font-normal bg-primary_font_2 hover:text-primary_font_2 border-[1px] border-solid border-primary_font_2"
            >
              Share internally
            </AlertDialogAction>
          )}

          {tab === 'groups' && (
            <AlertDialogAction
              onClick={handleShare}
              disabled={selectedGroups.length === 0}
              className="rounded-full text-white font-normal bg-primary_font_2 hover:text-primary_font_2 border-[1px] border-solid border-primary_font_2"
            >
              Share in groups
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ShareGroupContentModal;

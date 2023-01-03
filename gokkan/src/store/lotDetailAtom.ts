import { atomsWithQuery } from 'jotai-tanstack-query';
import axios from 'axios';
import { atom } from 'jotai';

interface LotDetail {
  id: number;
  itemNumber: string;
  name: string;
  thumbnail: string;
  startPrice: number;
  width: number;
  depth: number;
  height: number;
  material: string;
  conditionGrade: string;
  conditionDescription: string;
  text: string;
  designer: string;
  brand: string;
  productionYear: number;
  writer: null | string;
  category: {
    name: string;
    children: string[] | null[];
  };
  imageItemUrls: ImageUrl[];
  styles: string[];
  created: string;
  updated: string;
}

interface ImageUrl {
  id: number;
  url: string;
}

interface AuctionInfo {
  auctionEndDateTime: string;
  currentPrice: number;
}

interface BidInfo {
  memberId: string;
  price: number;
  bidTime: string;
}

const baseUrl = 'http://3.38.59.40:8080/api/v1';

const lotNumberAtom = atom(8);
const auctionIdAtom = atom(1);

const [lotDetailAtom] = atomsWithQuery((get) => ({
  queryKey: ['lotDetail', get(lotNumberAtom)],
  queryFn: async ({ queryKey: [, lotNumber] }): Promise<LotDetail> => {
    const res = await axios({
      method: 'get',
      url: `${baseUrl}/items/details/auction`,
      params: {
        itemId: lotNumber,
      },
    });

    return res?.data;
  },
}));

const [auctionInfoAtom] = atomsWithQuery((get) => ({
  queryKey: ['bidInfo', get(auctionIdAtom)],
  queryFn: async ({ queryKey: [, auctionId] }): Promise<AuctionInfo> => {
    const res = await axios({
      method: 'get',
      url: `${baseUrl}/auction`,
      params: {
        auctionId: auctionId,
      },
    });

    return res?.data;
  },
}));

const [bidHistoryAtom] = atomsWithQuery((get) => ({
  queryKey: ['bidHistory', get(auctionIdAtom)],
  queryFn: async ({ queryKey: [, auctionId] }): Promise<BidInfo[] | null[]> => {
    const res = await axios({
      method: 'get',
      url: `${baseUrl}/auction/history`,
      params: {
        auctionId: auctionId,
      },
    });

    return res?.data;
  },
}));

export { lotDetailAtom, auctionInfoAtom, bidHistoryAtom };

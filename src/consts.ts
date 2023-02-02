import AuctionImg from "./assets/images/icons/auction.png";
import CarStoryImg from "./assets/images/icons/car_story.png";
import ContractImg from "./assets/images/icons/contract.png";
import CreditImg from "./assets/images/icons/credit.png";
import CustomsImg from "./assets/images/icons/customs.png";
import DeliveryImg from "./assets/images/icons/delivery.png";
import DepositImg from "./assets/images/icons/deposite.png";
import FreightImg from "./assets/images/icons/freight.png";
import InstructionsImg from "./assets/images/icons/instructions.png";
import RefundImg from "./assets/images/icons/return.png";
import TransportImg from "./assets/images/icons/transport.png";
import InsuranceImg from "./assets/images/icons/insurance.png";
import SpareParts from "./assets/images/icons/spare_parts.png";
import Repair from "./assets/images/icons/repair.png";

import CustomsBrokerImg from "./assets/images/staff/customs_broker.jpg";
import DirectorImg from "./assets/images/staff/director.jpg";
import FinanceDirectorImg from "./assets/images/staff/finance_director.jpg";
import LogisticsSpecialistImg from "./assets/images/staff/logistics_specialist.jpg";
import SalesManagerImg from "./assets/images/staff/sales_manager.jpg";
import SparePartsManagerImg from "./assets/images/staff/spare_parts_manager.jpg";

import { IMainItemProps } from "./components/MainItem/MainItem";

export interface IOption {
    value: string;
    label: string;
}

export interface IContactWithTeam {
    speciality: string;
    name: string;
    img: any;
    phone: string;
}

export const contact_with_team: IContactWithTeam[] = [
    {speciality: 'sales_manager', name: "nikolay_ghazaryan", img: SalesManagerImg, phone: '+374 55 66 65 55'},
    {speciality: 'sales_manager', name: "hayk_melkonyan", img: SalesManagerImg, phone: '+374 95 50 50 54'},
    {speciality: 'sales_manager', name: "rafik_yeranosyan", img: SalesManagerImg, phone: '+374 95 69 10 69'},
    {speciality: 'spare_parts_manager', name: "azat_avalyan", img: SparePartsManagerImg, phone: '+374 33 73 80 80'},
    {speciality: 'logistics_specialist', name: "victoria_aghabekyan", img: LogisticsSpecialistImg, phone: '+374 33 63 80 80'},
    {speciality: 'customs_broker', name: "lyova_igityan", img: CustomsBrokerImg, phone: '+374 33 43 80 80'},
    {speciality: 'finance_director', name: "hayk_meloyan", img: FinanceDirectorImg, phone: '+374 99 80 00 01'},
    {speciality: 'finance_director', name: "hayk_meloyan", img: DirectorImg, phone: '+374 33 53 80 80'},
];

export const main_page_items: IMainItemProps[] = [
    { img: InstructionsImg, itemTitle: "car_selection" },
    { img: DepositImg, itemTitle: "deposit_payment" },
    { img: CarStoryImg, itemTitle: "car_history" },
    { img: AuctionImg, itemTitle: "auction_participation" },
    { img: ContractImg, itemTitle: "contract_signing" },
    { img: TransportImg, itemTitle: "inland_transportation" },
    { img: InsuranceImg, itemTitle: "insurance" },
    { img: FreightImg, itemTitle: "sea_freight" },
    { img: CustomsImg, itemTitle: "customs_clearance" },
    { img: CreditImg, itemTitle: "credit" },
    { img: RefundImg, itemTitle: "refund" },
    { img: DeliveryImg, itemTitle: "delivery" },
    { img: SpareParts, itemTitle: "spare_parts" },
    { img: Repair, itemTitle: "repair" },
];

const personal = {
    email: "autocomplex1@mail.ru",
    phone: "+374 33 538080",
};

const locations: IOption[] = [
    { value: "1", label: "LA-BIRMINGHAM" },
    { value: "2", label: "LA-DOTHAN" },
    { value: "3", label: "LA-HUNTSVILLE" },
];

const fuelType: IOption[] = [
    { value: "1", label: "Petrol" },
    { value: "3", label: "Hybrid" },
    { value: "2", label: "Diesel" },
    { value: "4", label: "Full Electric" },
];

const age: IOption[] = [
    { value: "1", label: "up to 3 years" },
    { value: "2", label: "3 - 5 years" },
    { value: "3", label: "5 - 7 years" },
    { value: "4", label: "7+" },
    { value: "5", label: "0 - 5 years" },
    { value: "6", label: "5 - 10 years" },
    { value: "7", label: "10 - 15 years" },
];

const vehicle_type = [
    { value: "motorcycle", label: "Motorcycle" },
    { value: "sedan", label: "Sedan" },
    { value: "pickup", label: "Pickup" },
    { value: "suv", label: "SUV" },
];

export { personal, locations, fuelType, age, vehicle_type };

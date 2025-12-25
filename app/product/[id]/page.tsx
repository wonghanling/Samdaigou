'use client';

import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';

// 临时商品数据（后续从Firebase获取）
const products = [
  { id: '1', name: '山姆商品1 山姆海盐苏打饼干1.5kg', price: 73.00, imageUrl: '/16.webp', description: '经典海盐风味苏打饼干咸香交织片片松脆甄选进口原料自然麦香' },
  { id: '2', name: '山姆商品2 山姆牛肉馅酥脆饼干1kg', price: 95.00, imageUrl: '/17.webp', description: '满满真实牛肉松喷香酥脆料足味美' },
  { id: '3', name: '山姆商品3 黑松露火腿苏打饼干1.16kg', price: 71.00, imageUrl: '/18.webp', description: '轻咸不腻一口咔擦脆' },
  { id: '4', name: '山姆商品4 卡乐比Jagabee淡盐味薯条600g', price: 99.00, imageUrl: '/19.webp', description: '泰国进口咸香薯条' },
  { id: '5', name: '山姆商品5', price: 42.00, imageUrl: '/20.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '6', name: '山姆商品6', price: 68.00, imageUrl: '/21.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '7', name: '山姆商品7', price: 188.00, imageUrl: '/22.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '8', name: '山姆商品8', price: 98.00, imageUrl: '/23.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '9', name: '山姆商品9', price: 76.00, imageUrl: '/24.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '10', name: '山姆商品10', price: 88.00, imageUrl: '/25.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '11', name: '山姆商品11', price: 108.00, imageUrl: '/26.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '12', name: '山姆商品12', price: 65.00, imageUrl: '/28.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '13', name: '山姆商品13', price: 92.00, imageUrl: '/29.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '14', name: '山姆商品14', price: 55.00, imageUrl: '/178.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '15', name: '山姆商品15', price: 65.00, imageUrl: '/179.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '16', name: '山姆商品16', price: 45.00, imageUrl: '/180.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  // 爆款饼干 / 脆零食
  { id: '30', name: '山姆商品17', price: 4.49, imageUrl: '/30.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '32', name: '山姆商品18', price: 4.49, imageUrl: '/32.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '34', name: '山姆商品19', price: 4.49, imageUrl: '/34.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '36', name: '山姆商品20', price: 1.99, imageUrl: '/36.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '38', name: '山姆商品21', price: 1.99, imageUrl: '/38.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '40', name: '山姆商品22', price: 1.99, imageUrl: '/40.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '41', name: '山姆商品23', price: 1.99, imageUrl: '/41.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '42', name: '山姆商品24', price: 5.99, imageUrl: '/42.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '43', name: '山姆商品25', price: 5.99, imageUrl: '/43.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '44', name: '山姆商品26', price: 5.99, imageUrl: '/44.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  // 黄油甜点 / 西式点心
  { id: '45', name: '山姆商品27', price: 6.99, imageUrl: '/45.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '46', name: '山姆商品28', price: 6.99, imageUrl: '/46.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '47', name: '山姆商品29', price: 6.99, imageUrl: '/47.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '48', name: '山姆商品30', price: 6.99, imageUrl: '/48.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '49', name: '山姆商品31', price: 6.99, imageUrl: '/49.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '50', name: '山姆商品32', price: 6.99, imageUrl: '/50.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '51', name: '山姆商品33', price: 6.99, imageUrl: '/51.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '52', name: '山姆商品34', price: 6.99, imageUrl: '/52.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '53', name: '山姆商品35', price: 6.99, imageUrl: '/53.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '54', name: '山姆商品36', price: 6.99, imageUrl: '/54.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '55', name: '山姆商品37', price: 6.99, imageUrl: '/55.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  // 巧克力.糖果
  { id: '56', name: '山姆商品38', price: 7.99, imageUrl: '/56.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '57', name: '山姆商品39', price: 7.99, imageUrl: '/57.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '60', name: '山姆商品40', price: 7.99, imageUrl: '/60.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '61', name: '山姆商品41', price: 7.99, imageUrl: '/61.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '63', name: '山姆商品42', price: 7.99, imageUrl: '/63.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '65', name: '山姆商品43', price: 7.99, imageUrl: '/65.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '66', name: '山姆商品44', price: 7.99, imageUrl: '/66.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '67', name: '山姆商品45', price: 7.99, imageUrl: '/67.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '68', name: '山姆商品46', price: 7.99, imageUrl: '/68.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '69', name: '山姆商品47', price: 7.99, imageUrl: '/69.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '70', name: '山姆商品48', price: 7.99, imageUrl: '/70.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '72', name: '山姆商品49', price: 7.99, imageUrl: '/72.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '73', name: '山姆商品50', price: 7.99, imageUrl: '/73.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '74', name: '山姆商品51', price: 7.99, imageUrl: '/74.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '75', name: '山姆商品52', price: 7.99, imageUrl: '/75.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '76', name: '山姆商品53', price: 7.99, imageUrl: '/76.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '77', name: '山姆商品54', price: 7.99, imageUrl: '/77.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '78', name: '山姆商品55', price: 7.99, imageUrl: '/78.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '79', name: '山姆商品56', price: 7.99, imageUrl: '/79.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '80', name: '山姆商品57', price: 7.99, imageUrl: '/80.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '81', name: '山姆商品58', price: 7.99, imageUrl: '/81.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '82', name: '山姆商品59', price: 7.99, imageUrl: '/82.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '83', name: '山姆商品60', price: 7.99, imageUrl: '/83.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '84', name: '山姆商品61', price: 7.99, imageUrl: '/84.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '85', name: '山姆商品62', price: 7.99, imageUrl: '/85.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '86', name: '山姆商品63', price: 7.99, imageUrl: '/86.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '87', name: '山姆商品64', price: 7.99, imageUrl: '/87.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '88', name: '山姆商品65', price: 7.99, imageUrl: '/88.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '89', name: '山姆商品66', price: 7.99, imageUrl: '/89.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  // 坚果 · 健康零食
  { id: '90', name: '山姆商品67', price: 8.99, imageUrl: '/90.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '91', name: '山姆商品68', price: 8.99, imageUrl: '/91.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '92', name: '山姆商品69', price: 8.99, imageUrl: '/92.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '93', name: '山姆商品70', price: 8.99, imageUrl: '/93.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '94', name: '山姆商品71', price: 8.99, imageUrl: '/94.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '95', name: '山姆商品72', price: 8.99, imageUrl: '/95.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '96', name: '山姆商品73', price: 8.99, imageUrl: '/96.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '97', name: '山姆商品74', price: 8.99, imageUrl: '/97.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '98', name: '山姆商品75', price: 8.99, imageUrl: '/98.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '99', name: '山姆商品76', price: 8.99, imageUrl: '/99.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '100', name: '山姆商品77', price: 8.99, imageUrl: '/100.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '101', name: '山姆商品78', price: 8.99, imageUrl: '/101.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '102', name: '山姆商品79', price: 8.99, imageUrl: '/102.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '103', name: '山姆商品80', price: 8.99, imageUrl: '/103.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '104', name: '山姆商品81', price: 8.99, imageUrl: '/104.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '105', name: '山姆商品82', price: 8.99, imageUrl: '/105.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '106', name: '山姆商品83', price: 8.99, imageUrl: '/106.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '107', name: '山姆商品84', price: 8.99, imageUrl: '/107.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '108', name: '山姆商品85', price: 8.99, imageUrl: '/108.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '109', name: '山姆商品86', price: 8.99, imageUrl: '/109.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '110', name: '山姆商品87', price: 8.99, imageUrl: '/110.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '111', name: '山姆商品88', price: 8.99, imageUrl: '/111.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  // 饮品
  { id: '112', name: '山姆商品89', price: 3.99, imageUrl: '/112.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '113', name: '山姆商品90', price: 3.99, imageUrl: '/113.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '114', name: '山姆商品91', price: 3.99, imageUrl: '/114.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '115', name: '山姆商品92', price: 3.99, imageUrl: '/115.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '116', name: '山姆商品93', price: 3.99, imageUrl: '/116.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '117', name: '山姆商品94', price: 3.99, imageUrl: '/117.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '118', name: '山姆商品95', price: 3.99, imageUrl: '/118.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '119', name: '山姆商品96', price: 3.99, imageUrl: '/119.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '120', name: '山姆商品97', price: 3.99, imageUrl: '/120.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '121', name: '山姆商品98', price: 3.99, imageUrl: '/121.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '122', name: '山姆商品99', price: 3.99, imageUrl: '/122.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '123', name: '山姆商品100', price: 3.99, imageUrl: '/123.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '124', name: '山姆商品101', price: 3.99, imageUrl: '/124.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '125', name: '山姆商品102', price: 3.99, imageUrl: '/125.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '127', name: '山姆商品103', price: 3.99, imageUrl: '/127.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '128', name: '山姆商品104', price: 3.99, imageUrl: '/128.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '129', name: '山姆商品105', price: 3.99, imageUrl: '/129.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '130', name: '山姆商品106', price: 3.99, imageUrl: '/130.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '131', name: '山姆商品107', price: 3.99, imageUrl: '/131.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '132', name: '山姆商品108', price: 3.99, imageUrl: '/132.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '133', name: '山姆商品109', price: 3.99, imageUrl: '/133.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '134', name: '山姆商品110', price: 3.99, imageUrl: '/134.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '135', name: '山姆商品111', price: 3.99, imageUrl: '/135.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '136', name: '山姆商品112', price: 3.99, imageUrl: '/136.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '137', name: '山姆商品113', price: 3.99, imageUrl: '/137.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '138', name: '山姆商品114', price: 3.99, imageUrl: '/138.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '139', name: '山姆商品115', price: 3.99, imageUrl: '/139.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '140', name: '山姆商品116', price: 3.99, imageUrl: '/140.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '141', name: '山姆商品117', price: 3.99, imageUrl: '/141.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '142', name: '山姆商品118', price: 3.99, imageUrl: '/142.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '143', name: '山姆商品119', price: 3.99, imageUrl: '/143.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '144', name: '山姆商品120', price: 3.99, imageUrl: '/144.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '145', name: '山姆商品121', price: 3.99, imageUrl: '/145.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '146', name: '山姆商品122', price: 3.99, imageUrl: '/146.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '147', name: '山姆商品123', price: 3.99, imageUrl: '/147.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '148', name: '山姆商品124', price: 3.99, imageUrl: '/148.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '149', name: '山姆商品125', price: 3.99, imageUrl: '/149.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '150', name: '山姆商品126', price: 3.99, imageUrl: '/150.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '151', name: '山姆商品127', price: 3.99, imageUrl: '/151.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '152', name: '山姆商品128', price: 3.99, imageUrl: '/152.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '153', name: '山姆商品129', price: 3.99, imageUrl: '/153.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '154', name: '山姆商品130', price: 3.99, imageUrl: '/154.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '155', name: '山姆商品131', price: 3.99, imageUrl: '/155.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '156', name: '山姆商品132', price: 3.99, imageUrl: '/156.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '158', name: '山姆商品133', price: 3.99, imageUrl: '/158.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '159', name: '山姆商品134', price: 3.99, imageUrl: '/159.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '160', name: '山姆商品135', price: 3.99, imageUrl: '/160.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '161', name: '山姆商品136', price: 3.99, imageUrl: '/161.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '162', name: '山姆商品137', price: 3.99, imageUrl: '/162.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '163', name: '山姆商品138', price: 3.99, imageUrl: '/163.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '164', name: '山姆商品139', price: 3.99, imageUrl: '/164.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '165', name: '山姆商品140', price: 3.99, imageUrl: '/165.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '166', name: '山姆商品141', price: 3.99, imageUrl: '/166.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '167', name: '山姆商品142', price: 3.99, imageUrl: '/167.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  // 即刻速食
  { id: '168', name: '山姆商品143', price: 5.99, imageUrl: '/168.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '169', name: '山姆商品144', price: 5.99, imageUrl: '/169.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '170', name: '山姆商品145', price: 5.99, imageUrl: '/170.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '171', name: '山姆商品146', price: 5.99, imageUrl: '/171.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '172', name: '山姆商品147', price: 5.99, imageUrl: '/172.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '173', name: '山姆商品148', price: 5.99, imageUrl: '/173.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '174', name: '山姆商品149', price: 5.99, imageUrl: '/174.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '175', name: '山姆商品150', price: 5.99, imageUrl: '/175.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '176', name: '山姆商品151', price: 5.99, imageUrl: '/176.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '177', name: '山姆商品152', price: 5.99, imageUrl: '/177.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
];

export default function ProductDetail() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;
  const product = products.find(p => p.id === productId);
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [descriptionOpen, setDescriptionOpen] = useState(true);
  const [ingredientsOpen, setIngredientsOpen] = useState(false);
  const [additionalInfoOpen, setAdditionalInfoOpen] = useState(false);
  const [legalDisclaimerOpen, setLegalDisclaimerOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  if (!product) {
    return <div>商品不存在</div>;
  }

  const handleQuantityChange = (delta: number) => {
    setQuantity(Math.max(1, quantity + delta));
  };

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
    }, quantity);
  };

  // 判断是否是主页商品（1-16）
  const isHomeProduct = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16'].includes(productId);

  const handleBack = () => {
    if (isHomeProduct) {
      // 商品1-16返回主页
      router.push('/');
    } else {
      // 商品17-152返回上一页（用户来的分类页）
      router.back();
    }
  };

  return (
    <>
      <Navbar />

      <div className="bg-gray-50 min-h-screen">
        <div className="container-custom py-8">
          {/* 面包屑导航 */}
          <nav className="text-sm text-gray-600 mb-8">
            <Link href="/" className="hover:text-gray-900">首页</Link>
            <span className="mx-2">•</span>
            <Link href="/category" className="hover:text-gray-900">商品分类</Link>
            <span className="mx-2">•</span>
            <span className="text-gray-900">{product.name}</span>
          </nav>

          {/* 商品详情主体 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
            {/* 左侧：商品图片 */}
            <div className="relative">
              <div className="border-4 border-black bg-white p-8">
                <div className="relative aspect-square">
                  {/* NEW 标签 */}
                  <div className="absolute top-4 left-4 bg-green-500 text-white text-sm font-bold px-4 py-2 rounded-full uppercase z-10">
                    NEW
                  </div>
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    quality={95}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>

            {/* 右侧：商品信息 */}
            <div>
              {/* 品牌Logo占位 */}
              <div className="mb-6">
                <div className="w-16 h-16 border-2 border-gray-300 flex items-center justify-center text-xs text-gray-400">
                  LOGO
                </div>
              </div>

              {/* 商品标题 */}
              <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 uppercase">
                {product.name}
              </h1>

              {/* 价格 */}
              <div className="text-4xl font-bold text-gray-900 mb-6">
                €{product.price.toFixed(2)}
              </div>

              {/* 简短描述 */}
              <p className="text-gray-700 mb-6 leading-relaxed">
                {product.description}
              </p>

              {/* SKU */}
              <p className="text-sm text-gray-400 mb-6">
                SKU: PROD{product.id.padStart(6, '0')}
              </p>

              {/* 数量选择器和加购按钮 */}
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                {/* 数量选择器 */}
                <div className="flex items-center border-4 border-black">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="px-6 py-4 text-2xl font-bold hover:bg-gray-100 transition-colors"
                  >
                    −
                  </button>
                  <input
                    type="text"
                    value={quantity}
                    readOnly
                    className="w-16 text-center text-xl font-bold border-x-4 border-black"
                  />
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="px-6 py-4 text-2xl font-bold hover:bg-gray-100 transition-colors"
                  >
                    +
                  </button>
                </div>

                {/* 加入购物车按钮 */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-pink-500 hover:bg-pink-600 text-white font-black text-lg py-4 px-8 uppercase transition-colors"
                >
                  加入购物车
                </button>
              </div>

              {/* 支付方式图标 */}
              <div className="flex justify-end gap-2 mb-6">
                <div className="w-12 h-8 border border-gray-300 flex items-center justify-center text-xs">iD</div>
                <div className="w-12 h-8 border border-gray-300 flex items-center justify-center text-xs">BC</div>
                <div className="w-12 h-8 border border-gray-300 flex items-center justify-center text-xs">AE</div>
                <div className="w-12 h-8 border border-gray-300 flex items-center justify-center text-xs">MC</div>
                <div className="w-12 h-8 border border-gray-300 flex items-center justify-center text-xs">V</div>
                <div className="w-12 h-8 border border-gray-300 flex items-center justify-center text-xs">PP</div>
              </div>

              {/* 分享和帮助 */}
              <div className="flex items-center justify-between pt-6 border-t">
                <div className="flex items-center gap-4">
                  <span className="font-bold text-sm">分享:</span>
                  <button className="hover:opacity-70">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </button>
                  <button className="hover:opacity-70">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </button>
                </div>
                <button className="flex items-center gap-2 text-sm font-bold hover:text-pink-500">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  需要帮助?
                </button>
              </div>
            </div>
          </div>

          {/* 商品详情图片 */}
          {(() => {
            // 商品详情图片映射表
            const detailImageMap: { [key: string]: string[] } = {
              '1': ['0569', '0570', '0571', '0572'], // 商品1
              '2': ['0573', '0574', '0575', '0576'], // 商品2
              '3': ['0577', '0578', '0579', '0580'], // 商品3
              '4': ['074', '075', '076', '077'], // 商品4 (与商品25相同)
              '5': ['005', '006', '007', '008'],
              '6': ['009', '010', '011', '012'],
              '7': ['013', '014', '015', '016'],
              '8': ['066', '067', '068', '069'], // 商品8 (与商品23相同)
              '9': ['019', '020', '021', '022'],
              '10': ['023', '024', '025'],
              '11': ['026', '027'],
              '12': ['028', '029', '030'],
              '13': ['031', '032', '033', '034'],
              '14': ['035', '036', '037'],
              '15': ['038', '039', '040'],
              '16': ['041', '042', '043'],
              '30': ['044', '045', '046'], // 商品17 (分类页ID是30)
              '32': ['047', '048', '049', '050'], // 商品18
              '34': ['051', '052', '053'], // 商品19
              '36': ['054', '055', '056', '057'], // 商品20
              '38': ['058', '059', '060', '061'], // 商品21
              '40': ['062', '063', '064', '065'], // 商品22
              '41': ['066', '067', '068', '069'], // 商品23
              '42': ['070', '071', '072', '073'], // 商品24
              '43': ['074', '075', '076', '077'], // 商品25
              '44': ['078', '079', '080', '081'], // 商品26
              '45': ['082', '083', '084', '085'], // 商品27
              '46': ['013', '014', '015', '016'], // 商品28 (与商品7相同)
              '47': ['086', '087', '088', '089'], // 商品29
              '48': ['090', '091', '092', '093'], // 商品30
              '49': ['094', '095', '096', '097'], // 商品31
              '50': ['098', '099', '0100', '0101'], // 商品32
              '51': ['0102', '0103', '0104', '0105'], // 商品33
              '52': ['0106', '0107', '0108', '0109'], // 商品34
              '53': ['0110', '0111', '0112', '0113'], // 商品35
              '54': ['009', '010', '011', '012'], // 商品36 (与商品6相同)
              '55': ['0114', '0115', '0116'], // 商品37
              '56': ['023', '024', '025'], // 商品38 (与商品10相同)
              '57': ['0117', '0118', '0119', '0120'], // 商品39
              '60': ['0121', '0122', '0123', '0124'], // 商品40
              '61': ['0125', '0126', '0127', '0128'], // 商品41
              '63': ['0129', '0130', '0131', '0132'], // 商品42
              '65': ['0133', '0134', '0135', '0136'], // 商品43
              '66': ['0137', '0138', '0139', '0140'], // 商品44
              '67': ['0141', '0142', '0143', '0144'], // 商品45
              '68': ['0145', '0146', '0147', '0148'], // 商品46
              '69': ['0149', '0150', '0151', '0152'], // 商品47
              '70': ['0153', '0154', '0155', '0156'], // 商品48
              '72': ['0157', '0158', '0159', '0160'], // 商品49
              '73': ['0161', '0162', '0163', '0164'], // 商品50
              '74': ['0165', '0166', '0167', '0168'], // 商品51
              '75': ['0169', '0170', '0171', '0172'], // 商品52
              '76': ['0173', '0174', '0175', '0176'], // 商品53
              '77': ['0177', '0178', '0179', '0180'], // 商品54
              '78': ['0181', '0182', '0183', '0184'], // 商品55
              '79': ['0185', '0186', '0187', '0188'], // 商品56
              '80': ['0189', '0190', '0191', '0192'], // 商品57
              '81': ['0193', '0194', '0195', '0196'], // 商品58
              '82': ['0197', '0198', '0199', '0200'], // 商品59
              '83': ['0201', '0202', '0203', '0204'], // 商品60
              '84': ['0205', '0206', '0207', '0208'], // 商品61
              '85': ['0209', '0210', '0211', '0212'], // 商品62
              '86': ['0213', '0214', '0215', '0216'], // 商品63
              '87': ['0217', '0218', '0219', '0220'], // 商品64
              '88': ['0221', '0222', '0223', '0224'], // 商品65
              '89': ['0225', '0226', '0227', '0228'], // 商品66
              '90': ['0229', '0230', '0231', '0232'], // 商品67
              '91': ['0233', '0234', '0235', '0236'], // 商品68
              '92': ['0237', '0238', '0239', '0240'], // 商品69
              '93': ['0241', '0242', '0243', '0244'], // 商品70
              '94': ['0245', '0246', '0247', '0248'], // 商品71
              '95': ['0249', '0250', '0251', '0252'], // 商品72
              '96': ['019', '020', '021', '022'], // 商品73 (与商品9相同)
              '97': ['0253', '0254', '0255', '0256'], // 商品74
              '98': ['0257', '0258', '0259', '0260'], // 商品75
              '99': ['0261', '0262', '0263', '0264'], // 商品76
              '100': ['0265', '0266', '0267', '0268'], // 商品77
              '101': ['0269', '0270', '0271', '0272'], // 商品78
              '102': ['0273', '0274', '0275', '0276'], // 商品79
              '103': ['0277', '0278', '0279', '0280'], // 商品80
              '104': ['0281', '0282', '0283', '0284'], // 商品81
              '105': ['0285', '0286', '0287', '0288'], // 商品82
              '106': ['0289', '0290', '0291', '0292'], // 商品83
              '107': ['0293', '0294', '0295', '0296'], // 商品84
              '108': ['0297', '0298', '0299', '0300'], // 商品85
              '109': ['0301', '0302', '0303', '0304'], // 商品86
              '110': ['0305', '0306', '0307', '0308'], // 商品87
              '111': ['0309', '0310', '0311', '0312'], // 商品88
              '112': ['0313', '0314', '0315', '0316'], // 商品89
              '113': ['0317', '0318', '0319', '0320'], // 商品90
              '114': ['0321', '0322', '0323', '0324'], // 商品91
              '115': ['0325', '0326', '0327', '0328'], // 商品92
              '116': ['0329', '0330', '0331', '0332'], // 商品93
              '117': ['0333', '0334', '0335', '0336'], // 商品94
              '118': ['0337', '0338', '0339', '0340'], // 商品95
              '119': ['0341', '0342', '0343', '0344'], // 商品96
              '120': ['0345', '0346', '0347', '0348'], // 商品97
              '121': ['0349', '0350', '0351', '0352'], // 商品98
              '122': ['0353', '0354', '0355', '0356'], // 商品99
              '123': ['0357', '0358', '0359', '0360'], // 商品100
              '124': ['0361', '0362', '0363', '0364'], // 商品101
              '125': ['0365', '0366', '0367', '0368'], // 商品102
              '127': ['0369', '0370', '0371', '0372'], // 商品103
              '128': ['0373', '0374', '0375', '0376'], // 商品104
              '129': ['0377', '0378', '0379', '0380'], // 商品105
              '130': ['0381', '0382', '0383', '0384'], // 商品106
              '131': ['0385', '0386', '0387', '0388'], // 商品107
              '132': ['0421', '0422', '0423', '0424'], // 商品108
              '133': ['0393', '0394', '0395', '0396'], // 商品109
              '134': ['0397', '0398', '0399', '0400'], // 商品110
              '135': ['0401', '0402', '0403', '0404'], // 商品111
              '136': ['0405', '0406', '0407', '0408'], // 商品112
              '137': ['0409', '0410', '0411', '0412'], // 商品113
              '138': ['0413', '0414', '0415', '0416'], // 商品114
              '139': ['0417', '0418', '0419', '0420'], // 商品115
              '140': ['0389', '0390', '0391', '0392'], // 商品116
              '141': ['0425', '0426', '0427', '0428'], // 商品117
              '142': ['0429', '0430', '0431', '0432'], // 商品118
              '143': ['0433', '0434', '0435', '0436'], // 商品119
              '144': ['0437', '0438', '0439', '0440'], // 商品120
              '145': ['0441', '0442', '0443', '0444'], // 商品121
              '146': ['0445', '0446', '0447', '0448'], // 商品122
              '147': ['0449', '0450', '0451', '0452'], // 商品123
              '148': ['0453', '0454', '0455', '0456'], // 商品124
              '149': ['0457', '0458', '0459', '0460'], // 商品125
              '150': ['0461', '0462', '0463', '0464'], // 商品126
              '151': ['0465', '0466', '0467', '0468'], // 商品127
              '152': ['0469', '0470', '0471', '0472'], // 商品128
              '153': ['0473', '0474', '0475', '0476'], // 商品129
              '154': ['0477', '0478', '0479', '0480'], // 商品130
              '155': ['0481', '0482', '0483', '0484'], // 商品131
              '156': ['0485', '0486', '0487', '0488'], // 商品132
              '158': ['0489', '0490', '0491', '0492'], // 商品133
              '159': ['0493', '0494', '0495', '0496'], // 商品134
              '160': ['0497', '0498', '0499', '0500'], // 商品135
              '161': ['0501', '0502', '0503', '0504'], // 商品136
              '162': ['0505', '0506', '0507', '0508'], // 商品137
              '163': ['0509', '0510', '0511', '0512'], // 商品138
              '164': ['0513', '0514', '0515', '0516'], // 商品139
              '165': ['0517', '0518', '0519', '0520'], // 商品140
              '166': ['0521', '0522', '0523', '0524'], // 商品141
              '167': ['0525', '0526', '0527', '0528'], // 商品142
              '168': ['0529', '0530', '0531', '0532'], // 商品143
              '169': ['0533', '0534', '0535', '0536'], // 商品144
              '170': ['0537', '0538', '0539', '0540'], // 商品145
              '171': ['0541', '0542', '0543', '0544'], // 商品146
              '172': ['0545', '0546', '0547', '0548'], // 商品147
              '173': ['0549', '0550', '0551', '0552'], // 商品148
              '174': ['0553', '0554', '0555', '0556'], // 商品149
              '175': ['0557', '0558', '0559', '0560'], // 商品150
              '176': ['0561', '0562', '0563', '0564'], // 商品151
              '177': ['0565', '0566', '0567', '0568'], // 商品152
            };

            const images = detailImageMap[productId];

            if (images && images.length > 0) {
              return (
                <div className="mb-12">
                  <h2 className="text-3xl font-bold mb-6 text-center">商品详情</h2>
                  <div className="grid grid-cols-2 gap-3 max-w-2xl mx-auto">
                    {images.map((imgNum, index) => (
                      <div
                        key={imgNum}
                        className="bg-white border-2 border-black p-2 cursor-pointer hover:shadow-lg transition-shadow"
                        onClick={() => setLightboxImage(`/product-details/${imgNum}.webp`)}
                      >
                        <div className="relative w-full aspect-square">
                          <Image
                            src={`/product-details/${imgNum}.webp`}
                            alt={`${product.name} 详情 ${index + 1}`}
                            fill
                            quality={95}
                            className="object-contain"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            }
            return null;
          })()}

          {/* 可折叠的详细信息部分 */}
          <div className="max-w-5xl mx-auto space-y-4">
            {/* 返回按钮 */}
            <div className="mb-6">
              <button
                onClick={handleBack}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg transition-colors flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                {isHomeProduct ? '返回主页' : '返回分类页'}
              </button>
            </div>

            {/* Description */}
            <div className="border-t-2 border-black">
              <button
                onClick={() => setDescriptionOpen(!descriptionOpen)}
                className="w-full py-6 flex items-center justify-between text-left"
              >
                <h2 className="text-2xl font-bold">商品描述 Description</h2>
                <svg
                  className={`w-6 h-6 transform transition-transform ${descriptionOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {descriptionOpen && (
                <div className="pb-6 text-gray-700 leading-relaxed">
                  <p>
                    {product.description}这是一款来自山姆会员店的优质商品，经过精心挑选和严格的品质把控。
                    我们保证每一件商品都是正品，并提供快速配送服务，让您足不出户就能享受到山姆会员店的优质商品。
                  </p>
                </div>
              )}
            </div>

            {/* Ingredients */}
            <div className="border-t-2 border-black">
              <button
                onClick={() => setIngredientsOpen(!ingredientsOpen)}
                className="w-full py-6 flex items-center justify-between text-left"
              >
                <h2 className="text-2xl font-bold">原料 ingredients</h2>
                <svg
                  className={`w-6 h-6 transform transition-transform ${ingredientsOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {ingredientsOpen && (
                <div className="pb-6 text-gray-700">
                  <p>详细成分信息请查看商品包装。</p>
                </div>
              )}
            </div>

            {/* Additional Information */}
            <div className="border-t-2 border-black">
              <button
                onClick={() => setAdditionalInfoOpen(!additionalInfoOpen)}
                className="w-full py-6 flex items-center justify-between text-left"
              >
                <h2 className="text-2xl font-bold">附加信息 Additional Information</h2>
                <svg
                  className={`w-6 h-6 transform transition-transform ${additionalInfoOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {additionalInfoOpen && (
                <div className="pb-6 text-gray-700">
                  <p>配送信息：我们提供快速配送服务，一般2-3个工作日送达。</p>
                </div>
              )}
            </div>

            {/* Legal Disclaimer */}
            <div className="border-t-2 border-b-2 border-black">
              <button
                onClick={() => setLegalDisclaimerOpen(!legalDisclaimerOpen)}
                className="w-full py-6 flex items-center justify-between text-left"
              >
                <h2 className="text-2xl font-bold">法律声明 Legal Disclaimer</h2>
                <svg
                  className={`w-6 h-6 transform transition-transform ${legalDisclaimerOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {legalDisclaimerOpen && (
                <div className="pb-6 text-gray-700">
                  <p>本商品信息仅供参考，实际商品以收到的实物为准。</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox 图片放大弹窗 */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <div className="relative max-w-6xl max-h-full">
            {/* 关闭按钮 */}
            <button
              className="absolute -top-12 right-0 text-white text-4xl font-bold hover:text-gray-300"
              onClick={() => setLightboxImage(null)}
            >
              ×
            </button>
            {/* 放大的图片 */}
            <div className="relative w-full h-full">
              <Image
                src={lightboxImage}
                alt="商品详情放大图"
                width={1200}
                height={1200}
                quality={100}
                className="object-contain max-h-[90vh] w-auto mx-auto"
              />
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container-custom text-center">
          <p>&copy; 2024 山姆代购. All rights reserved.</p>
          <p className="text-sm text-gray-400 mt-2">南京克劳笛奥科技有限公司技术开发</p>
        </div>
      </footer>
    </>
  );
}

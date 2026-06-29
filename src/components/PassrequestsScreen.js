import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
  SafeAreaView,
  StatusBar,
  Modal,
  ScrollView,
} from 'react-native';
import BottomNavigation from './BottomNavigation';

const AVATAR_COLORS = [
  { bg: '#E6F1FB', fg: '#185FA5' },
  { bg: '#EAF3DE', fg: '#3B6D11' },
  { bg: '#FAEEDA', fg: '#854F0B' },
  { bg: '#FBEAF0', fg: '#993556' },
  { bg: '#E1F5EE', fg: '#0F6E56' },
];

const DUMMY_PASSES = [
  {
    id: '1',
    name: 'Harini',
    gender: 'Female',
    email: 'itsgokul555@gmail.com',
    dob: '29 May 2026',
    aadharNumber: '1234567890',
    voterNumber: '',
    panNumber: '',
    passportNumber: '',
    appliedAt: '29 May 2026, 3:12 PM',
    identityProofType: 'Aadhaar',
    passType: 'Senior Citizen',
    status: 'pending',
    declineReason: '',
  },
  {
    id: '2',
    name: 'Ravi Kumar',
    gender: 'Male',
    email: 'ravi.kumar@gmail.com',
    dob: '12 Jan 1958',
    aadharNumber: '',
    voterNumber: 'ABC1234567',
    panNumber: '',
    passportNumber: '',
    appliedAt: '28 May 2026, 11:04 AM',
    identityProofType: 'Voter ID',
    passType: 'Senior Citizen',
    status: 'pending',
    declineReason: '',
  },
  {
    id: '3',
    name: 'Meena S',
    gender: 'Female',
    email: 'meena.s@yahoo.com',
    dob: '03 Mar 1960',
    aadharNumber: '',
    voterNumber: '',
    panNumber: 'ABCDE1234F',
    passportNumber: '',
    appliedAt: '27 May 2026, 9:45 AM',
    identityProofType: 'PAN Card',
    passType: 'Senior Citizen',
    status: 'pending',
    declineReason: '',
  },
  {
    id: '4',
    name: 'Anbu Raja',
    gender: 'Male',
    email: 'anbu.raja@gmail.com',
    dob: '17 Jul 1955',
    aadharNumber: '',
    voterNumber: '',
    panNumber: '',
    passportNumber: 'P1234567',
    appliedAt: '26 May 2026, 2:30 PM',
    identityProofType: 'Passport',
    passType: 'Senior Citizen',
    status: 'pending',
    declineReason: '',
  },
  {
    id: '5',
    name: 'Priya Devi',
    gender: 'Female',
    email: 'priyadevi@outlook.com',
    dob: '22 Sep 1962',
    aadharNumber: '3216549870',
    voterNumber: '',
    panNumber: '',
    passportNumber: '',
    appliedAt: '25 May 2026, 4:00 PM',
    identityProofType: 'Aadhaar',
    passType: 'Senior Citizen',
    status: 'pending',
    declineReason: '',
  },
];

const STATUS_FILTERS = ['All', 'Approved', 'Declined'];

function getInitials(name = '') {
  return name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();
}

function getProofNumber(item) {
  switch (item.identityProofType) {
    case 'Aadhaar':  return { label: 'Aadhaar number',  value: item.aadharNumber };
    case 'Voter ID': return { label: 'Voter ID number', value: item.voterNumber };
    case 'PAN Card': return { label: 'PAN number',      value: item.panNumber };
    case 'Passport': return { label: 'Passport number', value: item.passportNumber };
    default:         return { label: 'ID number',       value: '—' };
  }
}

function StatusBadge({ status }) {
  const map = {
    pending:  { bg: '#FAEEDA', color: '#633806', label: 'Pending' },
    approved: { bg: '#EAF3DE', color: '#27500A', label: 'Approved' },
    declined: { bg: '#FCEBEB', color: '#791F1F', label: 'Declined' },
  };
  const s = map[status] || map.pending;
  return (
    <View style={[styles.badge, { backgroundColor: s.bg }]}>
      <View style={[styles.badgeDot, { backgroundColor: s.color }]} />
      <Text style={[styles.badgeText, { color: s.color }]}>{s.label}</Text>
    </View>
  );
}

// ── Decline reason modal ──────────────────────────────────────────────────────
function DeclineModal({ visible, onClose, onSubmit }) {
  const [reason, setReason] = useState('');

  function handleSubmit() {
    if (!reason.trim()) {
      Alert.alert('Reason required', 'Please enter a reason before submitting.');
      return;
    }
    onSubmit(reason.trim());
    setReason('');
  }

  function handleClose() {
    setReason('');
    onClose();
  }

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={handleClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.declineModal}>
          <Text style={styles.declineModalTitle}>Decline reason</Text>
          <Text style={styles.declineModalSub}>
            Please provide a reason for declining this pass request.
          </Text>
          <TextInput
            style={styles.reasonInput}
            placeholder="Enter reason here..."
            placeholderTextColor="#aaa"
            value={reason}
            onChangeText={setReason}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
          <View style={styles.declineModalActions}>
            <TouchableOpacity style={styles.cancelBtn} onPress={handleClose}>
              <Text style={styles.cancelBtnText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.submitDeclineBtn} onPress={handleSubmit}>
              <Text style={styles.submitDeclineBtnText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

// ── Detail modal ──────────────────────────────────────────────────────────────
function DetailModal({ item, visible, onClose, onApprove, onDecline, avatarColor }) {
  if (!item) return null;
  const proof = getProofNumber(item);

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.detailModal}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.detailHeader}>
              <View style={[styles.detailAvatar, { backgroundColor: avatarColor.bg }]}>
                <Text style={[styles.detailAvatarText, { color: avatarColor.fg }]}>
                  {getInitials(item.name)}
                </Text>
              </View>
              <Text style={styles.detailName}>{item.name}</Text>
              <StatusBadge status={item.status} />
            </View>

            <View style={styles.detailDivider} />

            <View style={styles.detailFields}>
              <DetailRow label="Gender"        value={item.gender} />
              <DetailRow label="Email"         value={item.email} />
              <DetailRow label="Date of birth" value={item.dob} />
              <DetailRow label="Applied at"    value={item.appliedAt} />
              <DetailRow label="Pass type"     value={item.passType} />
              <DetailRow label="Proof type"    value={item.identityProofType} />
              <DetailRow label={proof.label}   value={proof.value} />
              {item.status === 'declined' && item.declineReason ? (
                <DetailRow label="Decline reason" value={item.declineReason} highlight />
              ) : null}
            </View>

            {/* Show approve/decline only for pending */}
            {item.status === 'pending' && (
              <View style={styles.detailActions}>
                <TouchableOpacity style={styles.btnApprove} onPress={onApprove}>
                  <Text style={styles.btnApproveText}>✓  Approve</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnDecline} onPress={onDecline}>
                  <Text style={styles.btnDeclineText}>✕  Decline</Text>
                </TouchableOpacity>
              </View>
            )}
          </ScrollView>

          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Text style={styles.closeBtnText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

function DetailRow({ label, value, highlight }) {
  return (
    <View style={styles.detailRow}>
      <Text style={styles.detailKey}>{label}</Text>
      <Text style={[styles.detailVal, highlight && { color: '#A32D2D' }]}>{value || '—'}</Text>
    </View>
  );
}

// ── Pass card ─────────────────────────────────────────────────────────────────
function PassCard({ item, index, onPress }) {
  const avatarColor = AVATAR_COLORS[index % AVATAR_COLORS.length];
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.cardRow}>
        <View style={[styles.avatar, { backgroundColor: avatarColor.bg }]}>
          <Text style={[styles.avatarText, { color: avatarColor.fg }]}>
            {getInitials(item.name)}
          </Text>
        </View>
        <Text style={styles.cardName}>{item.name}</Text>
        <StatusBadge status={item.status} />
      </View>
    </TouchableOpacity>
  );
}

// ── Main screen ───────────────────────────────────────────────────────────────
export default function PassRequestsScreen() {
  const [passes, setPasses] = useState(DUMMY_PASSES);
  const [activeFilter, setActiveFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [detailVisible, setDetailVisible] = useState(false);
  const [declineVisible, setDeclineVisible] = useState(false);

  const visiblePasses = passes;

  const filtered = visiblePasses.filter((p) => {
    const matchFilter =
      activeFilter === 'All'
        ? p.status === 'pending'                      // ← CHANGED: All now shows only pending
        : p.status === activeFilter.toLowerCase();
    const matchSearch =
      !search || p.name.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const pendingCount  = passes.filter((p) => p.status === 'pending').length;
  const approvedCount = passes.filter((p) => p.status === 'approved').length;
  const declinedCount = visiblePasses.filter((p) => p.status === 'declined').length;

  function openDetail(item) {
    setSelectedItem(item);
    setDetailVisible(true);
  }

  function closeDetail() {
    setDetailVisible(false);
    setSelectedItem(null);
  }

  function handleApprove() {
    Alert.alert('Approve pass', 'Are you sure you want to approve this request?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Approve',
        onPress: () => {
          setPasses((prev) =>
            prev.map((p) =>
              p.id === selectedItem.id ? { ...p, status: 'approved' } : p
            )
          );
          closeDetail();
        },
      },
    ]);
  }

  function handleDeclinePress() {
    setDetailVisible(false);
    setDeclineVisible(true);
  }

  function handleDeclineSubmit(reason) {
    setPasses((prev) =>
      prev.map((p) =>
        p.id === selectedItem.id
          ? { ...p, status: 'declined', declineReason: reason }
          : p
      )
    );
    setDeclineVisible(false);
    setSelectedItem(null);
  }

  function handleDeclineClose() {
    setDeclineVisible(false);
    setDetailVisible(true);
  }

  const selectedIndex = selectedItem
    ? DUMMY_PASSES.findIndex((p) => p.id === selectedItem.id)
    : 0;
  const avatarColor = AVATAR_COLORS[selectedIndex % AVATAR_COLORS.length];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Pass requests</Text>
      </View>

      {/* Stats */}
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Pending</Text>
          <Text style={[styles.statValue, { color: '#BA7517' }]}>{pendingCount}</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Approved</Text>
          <Text style={[styles.statValue, { color: '#3B6D11' }]}>{approvedCount}</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Declined</Text>
          <Text style={[styles.statValue, { color: '#A32D2D' }]}>{declinedCount}</Text>
        </View>
      </View>

      {/* Search */}
      <View style={styles.searchWrap}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name..."
          placeholderTextColor="#888"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Filter tabs */}
      <View style={styles.filterRow}>
        {STATUS_FILTERS.map((f) => (
          <TouchableOpacity
            key={f}
            style={[styles.filterBtn, activeFilter === f && styles.filterBtnActive]}
            onPress={() => setActiveFilter(f)}
          >
            <Text style={[styles.filterBtnText, activeFilter === f && styles.filterBtnTextActive]}>
              {f}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* List */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <PassCard item={item} index={index} onPress={() => openDetail(item)} />
        )}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyWrap}>
            <Text style={styles.emptyIcon}>📭</Text>
            <Text style={styles.emptyText}>No requests found</Text>
          </View>
        }
        showsVerticalScrollIndicator={false}
      />

      <DetailModal
        item={selectedItem}
        visible={detailVisible}
        onClose={closeDetail}
        onApprove={handleApprove}
        onDecline={handleDeclinePress}
        avatarColor={avatarColor}
      />

      <DeclineModal
  visible={declineVisible}
  onClose={handleDeclineClose}
  onSubmit={handleDeclineSubmit}
/>

<BottomNavigation activeTab="requests" />

</SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F5F5F5' },

  header: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#fff',
    borderBottomWidth: 0.5,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: { fontSize: 18, fontWeight: '500', color: '#1A1A1A' },

  statsRow: { flexDirection: 'row', gap: 10, padding: 12, backgroundColor: '#fff' },
  statCard: { flex: 1, backgroundColor: '#F5F5F5', borderRadius: 8, padding: 12 },
  statLabel: { fontSize: 12, color: '#888', marginBottom: 4 },
  statValue: { fontSize: 22, fontWeight: '500', color: '#1A1A1A' },

  searchWrap: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#fff',
  },
  searchInput: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    color: '#1A1A1A',
    borderWidth: 0.5,
    borderColor: '#E0E0E0',
  },

  filterRow: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingBottom: 10,
    paddingTop: 4,
    gap: 8,
    backgroundColor: '#fff',
    borderBottomWidth: 0.5,
    borderBottomColor: '#E0E0E0',
  },
  filterBtn: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: '#D0D0D0',
    backgroundColor: '#fff',
  },
  filterBtnActive: { backgroundColor: '#185FA5', borderColor: '#185FA5' },
  filterBtnText: { fontSize: 12, color: '#666' },
  filterBtnTextActive: { color: '#fff' },

  listContent: { padding: 12, paddingBottom: 100 },

  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: '#E0E0E0',
    padding: 14,
    marginBottom: 10,
  },
  cardRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { fontSize: 15, fontWeight: '500' },
  cardName: { fontSize: 15, fontWeight: '500', color: '#1A1A1A', flex: 1 },

  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
  },
  badgeDot: { width: 5, height: 5, borderRadius: 3 },
  badgeText: { fontSize: 11, fontWeight: '500' },

  emptyWrap: { alignItems: 'center', paddingTop: 80 },
  emptyIcon: { fontSize: 36, marginBottom: 10 },
  emptyText: { fontSize: 14, color: '#999' },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'flex-end',
  },

  detailModal: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '90%',
  },
  detailHeader: { alignItems: 'center', paddingVertical: 12, gap: 8 },
  detailAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  detailAvatarText: { fontSize: 22, fontWeight: '500' },
  detailName: { fontSize: 18, fontWeight: '500', color: '#1A1A1A' },
  detailDivider: { height: 0.5, backgroundColor: '#E0E0E0', marginVertical: 12 },
  detailFields: { gap: 2, marginBottom: 16 },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#F0F0F0',
  },
  detailKey: { fontSize: 13, color: '#888' },
  detailVal: {
    fontSize: 13,
    fontWeight: '500',
    color: '#1A1A1A',
    textAlign: 'right',
    flex: 1,
    marginLeft: 12,
  },
  detailActions: { flexDirection: 'row', gap: 10, marginBottom: 12 },
  btnApprove: {
    flex: 1,
    paddingVertical: 11,
    borderRadius: 10,
    backgroundColor: '#3B6D11',
    alignItems: 'center',
  },
  btnApproveText: { fontSize: 13, fontWeight: '500', color: '#fff' },
  btnDecline: {
    flex: 1,
    paddingVertical: 11,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#E24B4A',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  btnDeclineText: { fontSize: 13, fontWeight: '500', color: '#A32D2D' },
  closeBtn: {
    paddingVertical: 11,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#D0D0D0',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  closeBtnText: { fontSize: 13, color: '#666' },

  declineModal: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  declineModalTitle: { fontSize: 16, fontWeight: '500', color: '#1A1A1A', marginBottom: 4 },
  declineModalSub: { fontSize: 13, color: '#888', marginBottom: 14 },
  reasonInput: {
    borderWidth: 0.5,
    borderColor: '#D0D0D0',
    borderRadius: 10,
    padding: 12,
    fontSize: 14,
    color: '#1A1A1A',
    minHeight: 100,
    backgroundColor: '#FAFAFA',
    marginBottom: 14,
  },
  declineModalActions: { flexDirection: 'row', gap: 10 },
  cancelBtn: {
    flex: 1,
    paddingVertical: 11,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#D0D0D0',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  cancelBtnText: { fontSize: 13, color: '#666' },
  submitDeclineBtn: {
    flex: 1,
    paddingVertical: 11,
    borderRadius: 10,
    backgroundColor: '#A32D2D',
    alignItems: 'center',
  },
  submitDeclineBtnText: { fontSize: 13, fontWeight: '500', color: '#fff' },
});